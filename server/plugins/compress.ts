import { definePlugin } from "nitro";
import type { H3Event } from "h3";
import { brotliCompressSync, constants, gzipSync } from "node:zlib";

const COMPRESSIBLE_TYPES = ["text/", "application/json", "application/javascript"];
const MIN_SIZE = 1024;
const MAX_SIZE = 10 * 1024 * 1024;

type MiddlewareStack = Array<(event: H3Event, next: () => unknown) => unknown>;

const pickEncoding = (acceptEncoding: string | null): "br" | "gzip" | null => {
    if (!acceptEncoding) return null;
    const encodings = acceptEncoding.toLowerCase();
    if (encodings.includes("br")) return "br";
    if (encodings.includes("gzip")) return "gzip";
    return null;
};

const readBody = async (body: ReadableStream<Uint8Array>): Promise<Uint8Array | null> => {
    const reader = body.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (!value) continue;
            total += value.length;
            if (total > MAX_SIZE) return null;
            chunks.push(value);
        }
    } finally {
        reader.releaseLock();
    }

    return total > 0 ? new Uint8Array(Buffer.concat(chunks)) : null;
};

export default definePlugin((nitroApp) => {
    const h3 = nitroApp.h3;
    if (!h3) return;

    const middleware = h3 as unknown as { "~middleware": MiddlewareStack };
    const compress = async (event: H3Event, next: () => unknown) => {
        const response = (await next()) as Response | undefined;
        if (!response) return response;

        if (response.headers.get("content-encoding")) return response;

        const contentType = response.headers.get("content-type") || "";
        if (!COMPRESSIBLE_TYPES.some((type) => contentType.startsWith(type))) return response;

        const encoding = pickEncoding(event.req.headers.get("accept-encoding"));
        if (!encoding) return response;

        const contentLengthHeader = response.headers.get("content-length");
        if (contentLengthHeader !== null) {
            const contentLength = Number(contentLengthHeader);
            if (
                Number.isFinite(contentLength) &&
                (contentLength < MIN_SIZE || contentLength > MAX_SIZE)
            ) {
                return response;
            }
        }

        const cloned = response.clone();

        let body: Uint8Array | null;
        if (cloned.body instanceof ReadableStream) {
            body = await readBody(cloned.body);
        } else {
            const raw = (cloned as unknown as { body: unknown }).body as Uint8Array | string | null;
            if (raw == null) return response;
            body = typeof raw === "string" ? new Uint8Array(Buffer.from(raw)) : raw;
        }

        if (!body || body.byteLength < MIN_SIZE) return response;

        try {
            const compressed =
                encoding === "br"
                    ? brotliCompressSync(body, {
                          params: { [constants.BROTLI_PARAM_QUALITY]: 6 },
                      })
                    : gzipSync(body, { level: 6 });
            if (compressed.length >= body.byteLength) return response;

            const headers = new Headers(cloned.headers);
            headers.set("content-encoding", encoding);
            headers.set("vary", "Accept-Encoding");
            headers.set("content-length", String(compressed.length));

            return new Response(compressed, {
                status: cloned.status,
                statusText: cloned.statusText,
                headers,
            });
        } catch {
            return response;
        }
    };

    middleware["~middleware"].push(compress);
});
