
const Loader = () => {
    let circleCommonClasses = 'h-[10px] w-[10px] bg-[#fff] rounded-full';

    return (
        <div className='flex'>
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
            <div
                className={`${circleCommonClasses} mr-1 animate-bounce200`}
            ></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
        </div>
    );
};

export default Loader;