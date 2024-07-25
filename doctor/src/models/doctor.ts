import mongoose, { Schema, model, Document, Types } from "mongoose";


export enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other",
  }

export enum DoctorType {
    FAMILY_MEDICINE_PHYSICIAN = "Family Medicine Physician",
    INTERNAL_MEDICINE_PHYSICIAN = "Internal Medicine Physician (Internist)",
    PEDIATRICIAN = "Pediatrician",
    GENERAL_SURGEON = "General Surgeon",
    ORTHOPEDIC_SURGEON = "Orthopedic Surgeon",
    CARDIOTHORACIC_SURGEON = "Cardiothoracic Surgeon",
    NEUROSURGEON = "Neurosurgeon",
    PLASTIC_SURGEON = "Plastic Surgeon",
    OPHTHALMIC_SURGEON = "Ophthalmic Surgeon (Ophthalmologist)",
    CARDIOLOGIST = "Cardiologist",
    ENDOCRINOLOGIST = "Endocrinologist",
    GASTROENTEROLOGIST = "Gastroenterologist",
    HEMATOLOGIST = "Hematologist",
    INFECTIOUS_DISEASE_SPECIALIST = "Infectious Disease Specialist",
    NEPHROLOGIST = "Nephrologist",
    ONCOLOGIST = "Oncologist",
    PULMONOLOGIST = "Pulmonologist",
    RHEUMATOLOGIST = "Rheumatologist",
    ALLERGIST_IMMUNOLOGIST = "Allergist/Immunologist",
    DERMATOLOGIST = "Dermatologist",
    NEUROLOGIST = "Neurologist",
    OBSTETRICIAN_GYNECOLOGIST = "Obstetrician/Gynecologist (OB/GYN)",
    PSYCHIATRIST = "Psychiatrist",
    RADIOLOGIST = "Radiologist",
    ANESTHESIOLOGIST = "Anesthesiologist",
    GERIATRICIAN = "Geriatrician",
    SPORTS_MEDICINE_PHYSICIAN = "Sports Medicine Physician",
    EMERGENCY_MEDICINE_PHYSICIAN = "Emergency Medicine Physician",
    OTOLARYNGOLOGIST = "Otolaryngologist (ENT Specialist)",
    UROLOGIST = "Urologist"
}

export interface DoctorDoc extends mongoose.Document {
    doctor: Types.ObjectId;
    address: string;
    type: DoctorType;
    experience: number;
    fees: number;
    city: string;
    state: string;
    pincode: number;
    isDocumentVerified: boolean;
    defaultTiming: string[];
    timePerAppointment: number;
    appointmentInADay: number;
}


const doctorSchema = new mongoose.Schema(
    
    {
        doctor : { type : Schema.Types.ObjectId, ref : 'User' },
  
        address: {
          type: String,
          required: true,
        },
        type :{
            type: String,
            required: true,
            enum: Object.values(DoctorType),
        },
        experience :{
            type: Number,
            required: true,
        },
        fees :{
            type: Number,
            
        },
        city:{
            type: String,
            required: true,
        },
        state:{
            type: String,
            required: true,
        },
        pincode:{
            type: Number,
            required: true,
        },
        isDocumentVerified: {
          type: Boolean,
          default: false,
        },
        defaultTiming:{
            type: Array,
            default: [],
        },
        timePerAppointment:{
            type: Number,
            required: true,
        },
        appointmentInADay:{
            type: Number,
            default: null,
        },

      },
      {
        timestamps: true,
        toJSON: {
          transform(doc, ret) {
            ret.id = ret._id;
                
            delete ret._id;
            delete ret.password;
            delete ret.__v;
          },
        },
      }
)

interface DoctorModel extends mongoose.Model<DoctorDoc> {
  build(attrs: DoctorDoc): DoctorDoc;
}

/**
 * Builds a new user document
 * @param attrs - attributes for the user document
 */
doctorSchema.statics.build = (attrs: DoctorDoc) => {
  return new Doctor(attrs);
};

const Doctor =  mongoose.model<DoctorDoc, DoctorModel>("Doctor", doctorSchema);

export {Doctor};
