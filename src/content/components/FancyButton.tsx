type ButtonType = "default" | "green" | "blue";

export function FancyButton({
  onClick,
  children,
  disabled,
  type = "default",
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: ButtonType;
}) {
  return (
    <button
      onClick={onClick}
      className={` ${
        type === "green" ? "bg-green-600 hover:bg-green-700" : "bg-gray-300"
      }
         text-[#050505] font-bold px-6 py-3 text-2xl overflow-hidden mt-5 relative -top-3 rounded-[18px] border-[3px] border-[#8D8A86] bg-[#c3c2c0] shadow-[0_8px_0_0_#8D8A86,0_8px_8px_0_rgba(0,0,0,0.4)]
       ${
         !disabled
           ? "hover:top-[-4px] hover:shadow-[0_4px_0_0_#8D8A86,0_4px_4px_0_rgba(0,0,0,0.4)] active:top-0 active:shadow-[0_0px_0_0_#8D8A86]"
           : "cursor-not-allowed bg-gray-200 text-gray-500 shadow-none"
       }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
