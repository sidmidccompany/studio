// Use server directive since it will be imported by Next.js React code.
'use server';

/**
 * @fileOverview AI-powered planting schedule creation flow.
 *
 * This file defines a Genkit flow that leverages AI to generate optimized planting schedules
 * for farmers, taking into account local weather patterns and crop types.
 *
 * @interface CreatePlantingScheduleInput - The input type for the createPlantingSchedule function.
 * @interface CreatePlantingScheduleOutput - The output type for the createPlantingSchedule function.
 * @function createPlantingSchedule - A function that generates the planting schedule.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreatePlantingScheduleInputSchema = z.object({
  cropType: z.string().describe('The type of crop for which to generate a planting schedule.'),
  location: z.string().describe('The geographic location for which to generate a planting schedule.'),
  weatherData: z.string().optional().describe('Historical weather data for the location.').default("No weather data provided."),
  farmerPreferences: z.string().optional().describe('Any specific preferences or constraints from the farmer.').default("No farmer preferences provided."),
});
export type CreatePlantingScheduleInput = z.infer<typeof CreatePlantingScheduleInputSchema>;

const CreatePlantingScheduleOutputSchema = z.object({
  plantingSchedule: z.string().describe('The optimized planting schedule for the specified crop and location.'),
  rationale: z.string().describe('The reasoning behind the generated planting schedule.'),
});
export type CreatePlantingScheduleOutput = z.infer<typeof CreatePlantingScheduleOutputSchema>;

export async function createPlantingSchedule(input: CreatePlantingScheduleInput): Promise<CreatePlantingScheduleOutput> {
  return createPlantingScheduleFlow(input);
}

const createPlantingSchedulePrompt = ai.definePrompt({
  name: 'createPlantingSchedulePrompt',
  input: {schema: CreatePlantingScheduleInputSchema},
  output: {schema: CreatePlantingScheduleOutputSchema},
  prompt: `You are an expert agricultural advisor. Your goal is to provide an optimized planting schedule for farmers.

  Consider the following information when creating the schedule:

  Crop Type: {{{cropType}}}
  Location: {{{location}}}
  Weather Data: {{{weatherData}}}
  Farmer Preferences: {{{farmerPreferences}}}

  Provide a planting schedule that includes specific dates or date ranges for key activities such as:
  - Seed selection
  - Land preparation
  - Planting
  - Irrigation
  - Fertilization
  - Pest control
  - Harvesting

  Also, explain the rationale behind the schedule. Explain why each of these dates are chosen.
  `,
});

const createPlantingScheduleFlow = ai.defineFlow(
  {
    name: 'createPlantingScheduleFlow',
    inputSchema: CreatePlantingScheduleInputSchema,
    outputSchema: CreatePlantingScheduleOutputSchema,
  },
  async input => {
    const {output} = await createPlantingSchedulePrompt(input);
    return output!;
  }
);
