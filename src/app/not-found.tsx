
export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen" style={{ backgroundColor: '#43AA8B', width:"100vw" }}>
        <div className="text-center">
          <h1 className="mt-4 text-8xl font-playwrite text-gray-800 ">Oops!</h1>
          <p className="mt-4 text-4xl font-playwrite text-gray-800 ">
          This page doesn't exist.<br></br> Please return to the previous page or go home by pressing the button.
          </p>
          <a
            href="/"
            className="mt-6 inline-block px-6 py-3 text-lg text-white bg-black border-2 border-black rounded-lg"
          >
            Go Back Home
          </a>
        </div>
      </div>
    
    );
}