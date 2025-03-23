const Header = () => {
  return (
    <header
      role="header"
      className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#F4EFE6] px-10 py-2"
    >
      <div className="flex items-center gap-2 text-[#1C160C]">
        <div className="size-7">
          <img
            src="/assets/icon/mediawiki.svg"
            alt="logo"
            className="object-cover"
          />
        </div>
        <h2 className="text-[#1C160C] text-lg font-bold leading-tight tracking-[-0.015em]">
          Banner
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-6">
        <div className="flex items-center gap-6">
          <a
            className="text-[#1C160C] text-sm font-medium leading-normal"
            target="_blank"
            href="https://www.linkedin.com/in/grace-effiong/"
          >
            LinkedIn
          </a>
          <a
            className="text-[#1C160C] text-sm font-medium leading-normal"
            target="_blank"
            href="https://github.com/Rubylena"
          >
            GitHub
          </a>
        </div>
        <div
          className={`bg-[url(/assets/img/Grace.jpeg)] bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8`}
          data-testid="profile-picture"
        ></div>
      </div>
    </header>
  );
};

export default Header;
