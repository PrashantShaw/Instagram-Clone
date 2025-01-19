import { ThemeToggleIconBtn } from "@/components/common/ThemeToggleIconBtn";

const SettingsPage = () => {
  return (
    <div className="flex flex-col p-6 gap-8 relative">
      <h1 className="text-4xl font-semibold">Settings</h1>
      <hr />
      <div className="flex items-center gap-2">
        <h2 className=" font-semibold">
          {/* Active Theme: {theme?.toUpperCase()} */}
          1. Active Theme:
        </h2>
        <ThemeToggleIconBtn variant={"secondary"} />
      </div>
    </div>
  );
};

export default SettingsPage;
