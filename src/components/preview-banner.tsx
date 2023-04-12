
/**
 * This shows a preview banner on the top left corner of the screen
 *
 */
export function PreviewBanner() {
  /*if (process.env.IS_NOT_PREVIEW) {
    return null;
  }*/
  return (
    <div className="w-28 h-28 bg-transparent fixed flex flex-col justify-center items-center -rotate-45 -left-6 -top-10 pointer-events-none">
      <span className="bg-red-700 text-white px-6 w-full drop-shadow-lg text-xs">
        Preview
      </span>
    </div>
  );
}
