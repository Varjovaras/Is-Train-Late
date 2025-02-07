const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-foreground"></div>
    </div>
  );
};

export default Loading;
