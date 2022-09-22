const TagItem = ({ tag }: { tag: string }) => {
  return (
    <div className="border border-indigo-600 py-1 px-2 w-max bg-indigo-500 rounded-md text-white">
      {tag}
    </div>
  );
};

export default TagItem;
