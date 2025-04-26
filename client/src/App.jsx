<button
    onClick={() => {
        localStorage.removeItem('token');
        window.location.reload(); // force reset app state
    }}
        className="bg-red-500 text-white px-3 py-1 rounded float-right m-2"
        >
            Logout
    </button>