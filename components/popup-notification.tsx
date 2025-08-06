export function PopupNotification({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white relative rounded-lg p-8 max-w-md mx-4 text-center shadow-2xl">
        <div className="my-10 md:my-16">
          <div className="w-20 h-20 md:w-32 md:h-32 absolute -top-8 md:-top-16 right-0 left-0 bg-[#FFC5EB] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 md:w-20 md:h-20 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl md:text-4xl pt-4 font-medium text-gray-800 mb-4">
            Thank You!
          </h2>
          <p className="text-sm md:text-lg font-light tracking-wide">
            You details has been successfully submitted.
          </p>
          <p className="text-sm md:text-lg font-light tracking-wide">
            We&apos;ll be in touch soon.
          </p>
        </div>
        <button
          onClick={onClose}
          className="bg-[#FFC5EB] px-8 py-3 rounded-lg font-semibold text-base md:text-lg w-full cursor-pointer transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
}
