export default function SearchCard({ name, title, projectType, thumbnail, profileIcon, award }) {
    return (
        <div className="flex sm:flex-row flex-col py-4">
            <div
                style={{ borderColor: award }}
                className="rounded-xl w-full h-2/5 sm:h-52 sm:w-96 border-4 sm:mr-8 overflow-hidden">
                <img src={thumbnail} className="w-full object-cover object-center" alt="featured project" />
            </div>
            <div className="py-1 flex flex-row justify-start">
                <div className="flex flex-col">
                    <h2 className="font-rubik font-medium md:text-5xl sm:text-3xl">{title}</h2>
                    <div className="flex flex-row">
                        <p className="md:text-3xl sm:text-xl font-mono">
                            {name} • {projectType}
                        </p>
                    </div>
                    <img
                        src={profileIcon}
                        className="sm:my-5 rounded-full sm:h-16 sm:w-16 h-8 w-8 float-right"
                        alt="Profile"
                    />
                </div>
            </div>
        </div>
    );
}
