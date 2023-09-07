import RootLayout from "@/component/Layouts/RootLayout";

const LibraryPage = () => {
  return (
    <div className="flex items-center justify-center py-[10%] text-xl">
      <h1>Still Developing ......</h1>
    </div>
  );
};

LibraryPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default LibraryPage;
