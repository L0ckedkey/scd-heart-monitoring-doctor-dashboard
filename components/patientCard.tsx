import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Activity, Info, Trash2 } from "lucide-react";
import { InfoItem } from "./infoItems";
import { getAdditionalInfoColor, getCholesterolColor, getClassificationColor } from "./colors";

export const PatientCard = ({
    patient,
    redirectPage,
    removeMedicationFromPatient,
}) => {
    const hypertensionLabel =
        patient.isHavingHypertension === ""
            ? "No data"
            : patient.isHavingHypertension === "1"
                ? "Hypertension: Yes"
                : "Hypertension: No";

    const smokerLabel =
        patient.isSmoker === ""
            ? "No data"
            : patient.isSmoker === "1"
                ? "Smoker: Yes"
                : "Smoker: No";

    const cholesterolLabel =
        patient.cholesterolLevel === ""
            ? "No data"
            : `Cholesterol: ${patient.cholesterolLevel}`;

    const classificationLabel =
        patient.classification === null || patient.classification === undefined
            ? "No Data"
            : patient.classification === 0
                ? "Healthy"
                : "Not Healthy";

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg">{patient.email}</CardTitle>

                        <CardDescription className="flex flex-wrap gap-2">
                            <Badge className={getAdditionalInfoColor(patient.isHavingHypertension)}>
                                {hypertensionLabel}
                            </Badge>
                            <Badge className={getAdditionalInfoColor(patient.isSmoker)}>
                                {smokerLabel}
                            </Badge>
                            <Badge className={getCholesterolColor(patient.cholesterolLevel)}>
                                {cholesterolLabel}
                            </Badge>
                            <span className="text-xs text-slate-500">
                                Last visit: {patient.last_visit ?? "-"}
                            </span>
                        </CardDescription>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge className={getClassificationColor(patient.classification)}>
                            {classificationLabel}
                        </Badge>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => redirectPage(patient.patientID)}
                        >
                            <Activity className="h-4 w-4 mr-2" />
                            Check Patient Data
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <Label className="text-sm font-medium text-slate-700">
                    Current Medications
                </Label>

                <div className="flex flex-wrap gap-2 mt-2">
                    {patient.medications.map((med) => (
                        <div key={med.detailID} className="flex items-center gap-1">
                            <Badge variant="secondary">
                                {med.name} - {med.dosage}
                            </Badge>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0 text-blue-500"
                                    >
                                        <Info className="h-3 w-3" />
                                    </Button>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Medication Details</DialogTitle>
                                        <DialogDescription>
                                            Information about {med.name}
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="grid grid-cols-2 gap-4">
                                        <InfoItem label="Medication Name" value={med.name} />
                                        <InfoItem label="Dosage" value={med.dosage} />
                                        <InfoItem label="Frequency" value={med.frequency} />
                                        <InfoItem label="Patient" value={patient.email} />
                                    </div>

                                    <div className="mt-4">
                                        <Label className="text-sm font-medium">Notes</Label>
                                        <p className="text-sm text-slate-600 mt-1 p-3 bg-slate-50 rounded-md">
                                            {med.notes || "No additional notes"}
                                        </p>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-red-500"
                                onClick={() => removeMedicationFromPatient(med.detailID)}
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};