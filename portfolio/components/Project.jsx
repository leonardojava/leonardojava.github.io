export default function Project({ title, description, link}) {
    return (
      <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg hover:bg-opacity-60 transition-all max-w-3xl text-left">
        <div className="flex items-center mb-3">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-300">{description}</p>
        <a className="mt-4 text-blue-400 hover:text-blue-300 transition-colors flex items-center" href = {link} target="_blank">
          Learn more
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    );
  }