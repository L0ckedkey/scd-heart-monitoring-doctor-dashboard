import React, { useState } from "react";
export default function ConsultationForm({ selectedPatient, onSubmit }: any) {
    const [notes, setNotes] = useState("");
    if (!selectedPatient) return <p>Select a patient first.</p>;
    return (
        <div className="space-y-3">
            <p className="font-semibold">Patient: {selectedPatient.name}</p>


            <textarea
                className="w-full border p-2 rounded"
                rows={4}
                placeholder="Consultation notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />


            <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => onSubmit({ patientId: selectedPatient.id, notes })}
            >
                Submit
            </button>
        </div>
    );
}