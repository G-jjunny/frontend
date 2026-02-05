import Logo from '../../assets/logo/Logo_white.png';

const PageLogo = () => {
  return (
    <div className=" w-full flex flex-col gap-4 justify-center items-center ">
      <img src={Logo} alt="mega-logo" className=" w-[120px] md:w-[180px]" />
      {/* <h2 className=" md:text-xl md:text-md text-white">M SYSTEM에 오신 것을 환영합니다.</h2> */}
    </div>
  );
};

export default PageLogo;
