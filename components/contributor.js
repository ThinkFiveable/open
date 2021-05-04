import { useEffect, useState } from "react";

const bgColors = {
    maintainer: { color: "black", status: "Maintainer" },
    gold: { color: "#ffb800", status: "Gold Contributor" },
    silver: { color: "#878787", status: "Silver Contributor" },
    bronze: { color: "#ffb8a1", status: "Bronze Contributor" },
    contributor: { color: "#c9beff", status: "Contributor" }
};

class UserStatus {
    constructor(contribution) {
        this.contribution = contribution;
    }

    getLabelBgColor(maintainer) {
        if (maintainer) return bgColors.maintainer.color;
        if (this.contribution > 10) return bgColors.gold.color;
        if (this.contribution > 5) return bgColors.silver.color;
        if (this.contribution > 2) return bgColors.bronze.color;
        return bgColors.contributor.color;
    }

    getLabelText(maintainer) {
        if (maintainer) return bgColors.maintainer.status;
        if (this.contribution > 10) return bgColors.gold.status;
        if (this.contribution > 5) return bgColors.silver.status;
        if (this.contribution > 2) return bgColors.bronze.status;
        return bgColors.contributor.status;
    }
}

function Contributor({ name, contributions, avatar }) {
    const [maintainers, setMaintainers] = useState([]);
    const user = new UserStatus(contributions);

    useEffect(() => {
        fetch("https://api.github.com/orgs/thinkfiveable/public_members")
            .then((res) => res.json())
            .then(setMaintainers)
            .catch((err) => err);
    }, []);

    const maintainersName = maintainers.map(({ login }) => ({ login }));
    const checkUserStatus = maintainersName.find(({ login }) => login === name) !== undefined;

    return (
        <div className="flex m-4">
            <div className="m-0 mr-5 w-1/4 h-2/4">
                <img alt="avatar" className=" w-4/4 rounded-full" src={avatar} />
            </div>
            <div className="self-center flex-1">
                <h1 className=" text-lg font-medium text-left">@{name}</h1>
                {maintainersName ? (
                    <p
                        className="m-1 pb-1 h-5 rounded-full text-center text-xs font-medium "
                        style={{
                            background: user.getLabelBgColor(checkUserStatus),
                            color: checkUserStatus ? "white" : "black"
                        }}>
                        {user.getLabelText(checkUserStatus)}
                    </p>
                ) : null}
            </div>
        </div>
    );
}

export default function Contributors() {
    const [usersDetails, setUsersDetails] = useState([]);

    useEffect(() => {
        fetch("https://api.github.com/repos/thinkfiveable/open/contributors")
            .then((res) => res.json())
            .then(setUsersDetails)
            .catch((err) => err);
    }, []);

    return (
        <section className="flex-col p-8 lg:w-2/4" style={{ background: "#e5e5e5", margin: "0 auto" }}>
            {usersDetails
                ? usersDetails.map((user) => (
                      <Contributor
                          key={user.id}
                          name={user.login}
                          contributions={user.contributions}
                          avatar={user.avatar_url}
                      />
                  ))
                : null}
        </section>
    );
}
