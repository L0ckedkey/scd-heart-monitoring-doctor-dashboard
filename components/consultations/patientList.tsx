import React from "react";
export default function PatientList({ patients, onSelect }: any) {
    return (
        <div className="space-y-2">
            {patients?.map((p: any) => (
                <div
                    key={p.id}
                    className="p-3 border rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => onSelect(p)}
                >
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-gray-500">{p.age} years</p>
                </div>
            ))}
        </div>
    );
}