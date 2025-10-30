
import { GoogleGenAI } from "@google/genai";
import type { Patient } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateClinicalSummary(patient: Patient): Promise<string> {
  const patientDataString = `
    Patient Name: ${patient.name}
    Age: ${patient.age}
    Gender: ${patient.gender}
    
    Current Vitals:
    - Heart Rate: ${patient.vitals.heartRate.value} ${patient.vitals.heartRate.unit}
    - Blood Pressure: ${patient.vitals.bloodPressure.systolic.value}/${patient.vitals.bloodPressure.diastolic.value} ${patient.vitals.bloodPressure.systolic.unit}
    - Temperature: ${patient.vitals.temperature.value} ${patient.vitals.temperature.unit}
    - O2 Saturation: ${patient.vitals.oxygenSaturation.value}${patient.vitals.oxygenSaturation.unit}
    
    Current Medications:
    ${patient.medications.map(m => `- ${m.name} (${m.dosage}, ${m.frequency})`).join('\n')}
    
    Recent History:
    ${patient.history.map(v => `- ${v.date}: ${v.notes}`).join('\n')}
  `;

  const prompt = `
    You are a helpful medical assistant AI. Based on the following patient data, generate a concise clinical summary for a healthcare provider.
    Focus on key information, recent changes, and potential areas of concern. Format the output in clear, professional language using Markdown for readability (e.g., headings, bullet points).

    Patient Data:
    ${patientDataString}

    Generate the summary now.
  `;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating clinical summary:", error);
    return "Error: Could not generate summary. Please check the console for details.";
  }
}


export async function getMedicationSuggestions(symptoms: string): Promise<string> {
  if (!symptoms.trim()) {
    return "Please describe the patient's symptoms.";
  }

  const prompt = `
    A licensed healthcare professional is looking for informational suggestions.
    Based on the following patient symptoms, list up to three common medication suggestions (over-the-counter or prescription) with typical dosages and rationale.

    **IMPORTANT DISCLAIMER:** This is for informational purposes ONLY and is not medical advice. The healthcare professional is responsible for the final prescribing decision.

    Patient Symptoms: "${symptoms}"

    Provide suggestions in a clear, bulleted list.
  `;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting medication suggestions:", error);
    return "Error: Could not retrieve suggestions. Please check the console for details.";
  }
}
