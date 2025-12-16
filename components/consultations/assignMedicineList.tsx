import React from "react";
export default function AssignedMedicineList({ pending, onAssign }: any) {
    return (
        <div className="space-y-3">
            {pending?.map((item: any) => (
                <div key={item.id} className="p-4 border rounded">
                    <p className="font-semibold">{item.patientName}</p>
                    <button
                        className="mt-2 bg-purple-600 text-white px-3 py-1 rounded"
                        onClick={() => onAssign(item.id)}
                    >
                        Assign Medicine
                    </button>
                </div>
            ))}
        </div>
    );
}