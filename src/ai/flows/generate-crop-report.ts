'use server';
/**
 * @fileOverview A crop health report AI agent.
 *
 * - generateCropReport - A function that handles the crop report generation process.
 * - GenerateCropReportInput - The input type for the generateCropReport function.
 * - GenerateCropReportOutput - The return type for the generateCropReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCropReportInputSchema = z.object({
  region: z.string().describe('The region for which the crop report is needed.'),
  cropType: z.string().describe('The type of crop for the report.'),
  weatherData: z.string().describe('Weather data for the region.'),
  satelliteImagery: z.string().describe(
    "Satellite imagery of the crop area, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
  historicalData: z.string().describe('Historical crop data for the region.'),
});
export type GenerateCropReportInput = z.infer<typeof GenerateCropReportInputSchema>;

const GenerateCropReportOutputSchema = z.object({
  overallHealth: z.string().describe('The overall health of the crop in the region.'),
  potentialRisks: z.string().describe('Potential risks to the crop, such as disease or pests.'),
  recommendedActions: z.string().describe('Recommended actions for farmers to take.'),
});
export type GenerateCropReportOutput = z.infer<typeof GenerateCropReportOutputSchema>;

export async function generateCropReport(input: GenerateCropReportInput): Promise<GenerateCropReportOutput> {
  return generateCropReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCropReportPrompt',
  input: {schema: GenerateCropReportInputSchema},
  output: {schema: GenerateCropReportOutputSchema},
  prompt: `You are an AI assistant that generates detailed crop health reports for District Agricultural Officers.

  Based on the following information, generate a comprehensive crop health report:

  Region: {{{region}}}
  Crop Type: {{{cropType}}}
  Weather Data: {{{weatherData}}}
  Satellite Imagery: {{media url=satelliteImagery}}
  Historical Data: {{{historicalData}}}

  The report should include:
  - An overall assessment of the crop's health.
  - Identification of potential risks such as disease outbreaks or pest infestations.
  - Recommended actions for farmers to mitigate these risks.
  `,
});

const generateCropReportFlow = ai.defineFlow(
  {
    name: 'generateCropReportFlow',
    inputSchema: GenerateCropReportInputSchema,
    outputSchema: GenerateCropReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
