import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2 } from "lucide-react";

export const MedicationCard = ({
    medication,
    openDialogId,
    setOpenDialogId,
    editingMedication,
    setEditingMedication,
    updateMedication,
    deleteMedication,
}) => {
    const isOpen = openDialogId === medication.medID;

    const handleOpenChange = (open) => {
        if (open) {
            setEditingMedication({ ...medication });
            setOpenDialogId(medication.medID);
        } else {
            setOpenDialogId(null);
        }
    };

    return (
        <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-lg">{medication.medName}</h3>
                        <p className="text-sm text-slate-600">
                            {medication.dosage} • {medication.category}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Medication</DialogTitle>
                                    <DialogDescription>
                                        Update medication details
                                    </DialogDescription>
                                </DialogHeader>

                                {editingMedication && isOpen && (
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Medication Name</Label>
                                            <Input
                                                value={editingMedication.medName}
                                                onChange={(e) =>
                                                    setEditingMedication({
                                                        ...editingMedication,
                                                        medName: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        <div>
                                            <Label>Dosage</Label>
                                            <Input
                                                value={editingMedication.dosage}
                                                onChange={(e) =>
                                                    setEditingMedication({
                                                        ...editingMedication,
                                                        dosage: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        <div>
                                            <Label>Category</Label>
                                            <Input
                                                value={editingMedication.category}
                                                onChange={(e) =>
                                                    setEditingMedication({
                                                        ...editingMedication,
                                                        category: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        <Button
                                            className="w-full"
                                            onClick={() =>
                                                updateMedication(
                                                    editingMedication.medID,
                                                    editingMedication.medName,
                                                    editingMedication.dosage,
                                                    editingMedication.category
                                                )
                                            }
                                        >
                                            Update Medication
                                        </Button>
                                    </div>
                                )}
                            </DialogContent>
                        </Dialog>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => deleteMedication(medication.medID)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};