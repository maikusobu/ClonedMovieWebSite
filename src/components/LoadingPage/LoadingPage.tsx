import ReactLoading from 'react-loading';
function LoadingPage() {
    return (
        <div className=' h-[400px] flex justify-center items-center bg-slate-900'>
        <ReactLoading
                type="spokes" height={'4%'} width={'4%'} color="#fff"></ReactLoading>
            </div>);
}

export default LoadingPage;