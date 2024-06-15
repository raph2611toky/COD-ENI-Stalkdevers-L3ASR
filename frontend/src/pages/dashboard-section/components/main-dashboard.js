import React from 'react'
import RecentCard from './recent-card'
import ListeParDate from './liste-par-date'

export default function MainDashboard() {

    const recentsData = [
        { titre: "Demande d’acte de naissance", date: "16/05/18", prix: "20 000 Ar", etat: "En cours", lienVoirPlus: "/" },
        { titre: "Demande d’acte de naissance", date: "16/05/18", prix: "20 000 Ar", etat: "Validé", lienVoirPlus: "/" }
    ]

    return (
        <div className="w-full flex flex-col gap-20 py-10 px-12 pr-20 bg-transparent cursor-pointer ">
            <div  className="flex flex-col gap-7 overflow-x-scroll">
                <h3 className="font-sans text-lg">Récents</h3>
                <div className="flex gap-10">
                    {
                        recentsData.map((data, index) => <RecentCard props={data} key={index + data.date} />)
                    }
                </div>
            </div>
            <div  className="flex flex-col gap-7">
                <h3 className="font-sans text-lg">Liste par date</h3>
                <div className="flex flex-col gap-5 overflow-y-scroll">
                    {
                        recentsData.map((data, index) => <ListeParDate props={data} key={index + data.date} />)
                    }
                </div>
            </div>
        </div>
    )
}
