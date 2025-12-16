import {
    Card,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Activity, Calendar, Pill } from "lucide-react";
import { getAdditionalInfoColor, getCholesterolColor } from "./colors";

export const ConsultationCard = ({
    consultation,
    medicines,
    setSelectedPatient,
    assignMedicationToPatient,
    scheduleConsultation,
    redirectPage,
    selectedMedicationForAssignment,
    setSelectedMedicationForAssignment,
    assignmentDosage,
    setAssignmentDosage,
    assignmentNotes,
    setAssignmentNotes,
}) => {
    const hypertensionLabel =
        consultation.isHavingHypertension === ""
            ? "No data"
            : consultation.isHavingHypertension === "1"
                ? "Hypertension: Yes"
                : "Hypertension: No";

    const smokerLabel =
        consultation.isSmoker === ""
            ? "No data"
            : consultation.isSmoker === "1"
                ? "Smoker: Yes"
                : "Smoker: No";

    const cholesterolLabel =
        consultation.cholesterolLevel === ""
            ? "No data"
            : `Cholesterol: ${consultation.cholesterolLevel}`;

    return (
        <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">{consultation.email}</h3>
                        <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                            <Badge className={getAdditionalInfoColor(consultation.isHavingHypertension)}>
                                {hypertensionLabel}
                            </Badge>
                            <Badge className={getAdditionalInfoColor(consultation.isSmoker)}>
                                {smokerLabel}
                            </Badge>
                            <Badge className={getCholesterolColor(consultation.cholesterolLevel)}>
                                {cholesterolLabel}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedPatient(consultation)}
                                >
                                    <Pill className="h-4 w-4 mr-1" />
                                    Assign Medication
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Assign Medication to {consultation.email}
                                    </DialogTitle>
                                    <DialogDescription>
                                        Select a medication and add consultation notes
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-4">
                                    <div>
                                        <Label>Select Medication</Label>
                                        <Select
                                            value={selectedMedicationForAssignment}
                                            onValueChange={setSelectedMedicationForAssignment}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select medication" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {medicines.map((med) => (
                                                    <SelectItem key={med.medID} value={med.medID}>
                                                        {med.medName} - {med.dosage}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Frequency</Label>
                                        <Input
                                            value={assignmentDosage}
                                            onChange={(e) => setAssignmentDosage(e.target.value)}
                                            placeholder="e.g. Once a day"
                                        />
                                    </div>

                                    <div>
                                        <Label>Consultation Notes</Label>
                                        <Textarea
                                            rows={3}
                                            value={assignmentNotes}
                                            onChange={(e) => setAssignmentNotes(e.target.value)}
                                            placeholder="Notes & instructions"
                                        />
                                    </div>

                                    <Button
                                        className="w-full"
                                        disabled={!selectedMedicationForAssignment || !assignmentDosage}
                                        onClick={() =>
                                            assignMedicationToPatient(
                                                consultation.consultation_id,
                                                consultation.patientID,
                                                selectedMedicationForAssignment,
                                                assignmentDosage,
                                                assignmentNotes,
                                                "med_assign"
                                            )
                                        }
                                    >
                                        Assign Medication
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => scheduleConsultation(consultation.consultation_id)}
                        >
                            <Calendar className="h-4 w-4 mr-1" />
                            Schedule
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => redirectPage(consultation.patientID)}
                        >
                            <Activity className="h-4 w-4 mr-1" />
                            Check Data
                        </Button>
                    </div>
                </div>

                <div className="mt-4">
                    <Label className="text-sm font-medium text-slate-700">
                        Current Medications
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {consultation.medications.map((med, idx) => (
                            <Badge key={idx} variant="secondary">
                                {med.name} - {med.dosage}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};