export const InfoItem = ({ label, value }) => (
    <div>
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-sm text-slate-600">{value || "-"}</p>
    </div>
);