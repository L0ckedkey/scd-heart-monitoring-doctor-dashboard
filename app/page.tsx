"use client"

import { getPatients, getPendingConsultations, setMedAssignConsultation, setScheduleConsultation } from "@/components/api/patient";
import { addDetailMedicine, addMedicine, deleteDetailMedicine, deleteMedicine, getMedicines, updateMedicine } from "@/components/api/medicine";
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Heart, Pill, Calendar, User, Plus, Edit, Trash2, Info, RefreshCw, Activity } from "lucide-react"
import { getAdditionalInfoColor } from "@/components/colors";
import { PatientCard } from "@/components/patientCard";
import { MedicationCard } from "@/components/medicationCard";
import { ConsultationCard } from "@/components/consultationCard";


export default function DoctorDashboard() {
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [editingMedication, setEditingMedication] = useState(null)
  const [selectedMedicationForAssignment, setSelectedMedicationForAssignment] = useState("")
  const [assignmentDosage, setAssignmentDosage] = useState("")
  const [assignmentNotes, setAssignmentNotes] = useState("")
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    category: "",
  })

  const [open, setOpen] = useState(false)
  const [patients, setPatients] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [medicines, setMedicines] = useState([])
  const [openDialogId, setOpenDialogId] = useState(null);

  useEffect(() => {
    getPatients().then(setPatients).catch(console.error);
    getPendingConsultations().then(setConsultations).catch(console.error);
    getMedicines().then(setMedicines).catch(console.error)
  }, []);

  const addMedication = async (medName: String, dosage: String, category: String) => {
    try {
      const response = await addMedicine(medName, dosage, category);

      if (response.status) {
        getMedicines().then(setMedicines).catch(console.error)
        setNewMedication({ name: "", dosage: "", category: "" })
        setOpenDialogId(false)
      } else {
        console.error("Failed to Add Medicine: ");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateMedication = async (medID: String, medName: String, dosage: String, category: String) => {
    try {
      const response = await updateMedicine(medID, medName, dosage, category);

      if (response.status) {
        getMedicines().then(setMedicines).catch(console.error)
        setEditingMedication({ dosage: "", category: "", medID: "" })
        setOpenDialogId(null);
      } else {
        console.error("Failed to Add Medicine: ");
      }
    } catch (err) {
      console.error(err);
    }
  }

  const deleteMedication = async (medID: String) => {
    try {
      const response = await deleteMedicine(medID);
      console.log("here")
      if (response.status) {
        getMedicines().then(setMedicines).catch(console.error)
      } else {
        console.error("Failed to Add Medicine: ");
      }
    } catch (err) {
      console.error(err);
    }
  }

  const assignMedicationToPatient = async (consultationId: String, patientId: String, medicationName: String, frequency: String, notes: String, status: String) => {
    try {
      const response = await addDetailMedicine(patientId, medicationName, frequency, notes);

      if (response.status) {
        const response = await setMedAssignConsultation(consultationId, status);
        if (response.status) {
          getPendingConsultations().then(setConsultations).catch(console.error)
          getPatients().then(setPatients).catch(console.error)
        }
      }
    } catch (err) {
      console.error(err);
    }
    // Reset form
    setSelectedMedicationForAssignment("")
    setAssignmentDosage("")
    setAssignmentNotes("")
  }

  const removeMedicationFromPatient = async (detailID: String) => {
    try {
      const response = await deleteDetailMedicine(detailID);

      if (response.status) {
        getPatients().then(setPatients).catch(console.error);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const scheduleConsultation = async (consultationId: String) => {
    try {
      const response = await setScheduleConsultation(consultationId);
      if (response.status) {
        console.log("Consultation scheduled successfully");
        getPendingConsultations().then(setConsultations).catch(console.error);
      } else {
        console.error("Failed to schedule consultation:", response.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const refreshData = (page: String) => {
    if (page == 'patient') {
      getPatients().then(setPatients).catch(console.error);
    } else if (page == 'med') {
      getMedicines().then(setMedicines).catch(console.error);
    } else if (page == 'consul') {
      getPendingConsultations().then(setConsultations).catch(console.error);
    }

  }

  const redirectPage = (patientID: String) => {
    console.log(`${process.env.NEXT_PUBLIC_METABASE_URL}${patientID}`)
    window.open(
      `${process.env.NEXT_PUBLIC_METABASE_URL}${patientID}`,
      "_blank"
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Heart className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Cardiology Dashboard</h1>
              <p className="text-sm text-slate-600">Dr. Cardiologist - Heart Specialist</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-yellow-700 border-yellow-200">
              {consultations.length} Pending Consultations
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Patients
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Medications
            </TabsTrigger>
            <TabsTrigger value="consultations" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Consultations
            </TabsTrigger>
          </TabsList>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-slate-900"></h2>
              <Button variant="outline" size="sm" onClick={() => refreshData("patient")}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
            <div className="grid gap-4">
              {patients.map((patient) => (
                <PatientCard
                  key={patient.patientID}
                  patient={patient}
                  redirectPage={(id: String) => redirectPage(id)}
                  removeMedicationFromPatient={(id: String) => console.log("remove", id)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Medications Tab */}
          <TabsContent value="medications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-slate-900"></h2>
              <Button variant="outline" size="sm" onClick={() => refreshData("consul")}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Medication Management</CardTitle>
                    <CardDescription>Add, update, and manage medications</CardDescription>
                  </div>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Medication
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Medication</DialogTitle>
                        <DialogDescription>Enter the details for the new medication</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Medication Name</Label>
                          <Input
                            id="name"
                            value={newMedication.name}
                            onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                            placeholder="e.g., Lisinopril"
                          />
                        </div>
                        <div>
                          <Label htmlFor="dosage">Dosage</Label>
                          <Input
                            id="dosage"
                            value={newMedication.dosage}
                            onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                            placeholder="e.g., 10mg"
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={newMedication.category}
                            onValueChange={(value) =>
                              setNewMedication({ ...newMedication, category: value })
                            }
                          >
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ACE Inhibitor">ACE Inhibitor</SelectItem>
                              <SelectItem value="Analgesic">Analgesic</SelectItem>
                              <SelectItem value="Antibiotic">Antibiotic</SelectItem>
                              <SelectItem value="Folic Acid">Folic Acid</SelectItem>
                              <SelectItem value="Hydroxyurea">Hydroxyurea</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={() => addMedication(newMedication.name, newMedication.dosage, newMedication.category)} className="w-full">
                          Add Medication
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {medicines.map((medication) => (
                    <MedicationCard
                      key={medication.medID}
                      medication={medication}
                      openDialogId={openDialogId}
                      setOpenDialogId={setOpenDialogId}
                      editingMedication={editingMedication}
                      setEditingMedication={setEditingMedication}
                      updateMedication={updateMedication}
                      deleteMedication={deleteMedication}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Consultations Tab */}
          <TabsContent value="consultations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-slate-900"></h2>
              <Button variant="outline" size="sm" onClick={() => refreshData("consul")}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Patient Consultations</CardTitle>
                <CardDescription>Assign medications or schedule consultations for patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consultations.map((consultation) => (
                    <ConsultationCard
                      key={consultation.consultation_id}
                      consultation={consultation}
                      medicines={medicines}
                      setSelectedPatient={setSelectedPatient}
                      assignMedicationToPatient={assignMedicationToPatient}
                      scheduleConsultation={scheduleConsultation}
                      redirectPage={redirectPage}
                      selectedMedicationForAssignment={selectedMedicationForAssignment}
                      setSelectedMedicationForAssignment={
                        setSelectedMedicationForAssignment
                      }
                      assignmentDosage={assignmentDosage}
                      setAssignmentDosage={setAssignmentDosage}
                      assignmentNotes={assignmentNotes}
                      setAssignmentNotes={setAssignmentNotes}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
