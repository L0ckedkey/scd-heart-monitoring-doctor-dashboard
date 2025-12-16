import React from "react";
export default function PendingConsultation({ list, medicines, onUpdate }: any) {
    return (
        <div className="space-y-3">
            {list?.map((item: any) => (
                <div key={item.id} className="border p-4 rounded">
                    <p className="font-semibold">{item.patientName}</p>
                    <select className="border p-1 mt-2 w-full">
                        {medicines.map((m: any) => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>
                    <button
                        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                        onClick={onUpdate}
                    >
                        Save
                    </button>
                </div>
            ))}
        </div>
    );
}