import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET (){
  const user = await prisma.user.findMany()
  console.log(user)
  return NextResponse.json({user})
}

export async function POST (request: Request){
  const {
    Age,
    Sex,
    ChestPainType,
    RestingBP,
    Cholesterol,
    FastingBS,
    RestingECG,
    MaxHR,
    ExerciseAngina,
    Oldpeak,
    ST_Slope,
    userId, // Asegúrate de obtener el ID de usuario de alguna manera
    predictionValue,
  } = await request.json();

  const registro = await prisma.formulario.create({
    data: {
      Age: parseInt(Age),
      Sex: parseInt(Sex),
      ChestPainType: parseInt(ChestPainType),
      RestingBP: parseInt(RestingBP),
      Cholesterol: parseInt(Cholesterol),
      FastingBS: parseInt(FastingBS),
      RestingECG: parseInt(RestingECG),
      MaxHR: parseInt(MaxHR),
      ExerciseAngina: parseInt(ExerciseAngina),
      Oldpeak: parseFloat(Oldpeak),
      ST_Slope: parseInt(ST_Slope),
      userId: 1, 
      predictionValue: parseInt(predictionValue),
    },
  });

  return NextResponse.json({registro})
}