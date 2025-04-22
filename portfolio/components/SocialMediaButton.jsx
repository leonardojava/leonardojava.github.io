

export default function SocialMediaButton({icon, link}){
    return (
        <a 
          href={link} 
          target="_blank" 
          className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors"
        >
          {icon}
        </a>
      );
}