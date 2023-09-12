import { BadgeDelta, Flex, Metric, ProgressBar } from "@tremor/react";
import { StatusOnlineIcon } from "@heroicons/react/outline";

import React, { useEffect, useState } from 'react';
import { LineChart } from "@tremor/react";

import { PrismaClient } from '@prisma/client';



import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";

import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  DeltaType,
  Badge,
} from "@tremor/react";

export default async function DashboardExample() {

  const prisma = new PrismaClient();

  const userEmail = 'cbmedins@gmail.com'; // Reemplaza con el correo que desees buscar
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    // Maneja el caso en el que no se encuentre el usuario con el correo dado
    console.error(`No se encontró un usuario con el correo ${userEmail}`);
    return;
  }
  
      //  const response = await fetch('http://localhost:3000/api/submit-form');
  const feed = await prisma.formulario.findMany({
    where: { userId: user.id },
  });

  const sano = await prisma.formulario.findMany({
    where: { userId: user.id, predictionValue: 0 },
  });

  const enfermo = await prisma.formulario.findMany({
    where: { userId: user.id, predictionValue: 1 },
  });

  const dataFormatter = (number: number) => `${Intl.NumberFormat("us").format(number).toString()}%`;

  return (
    <main className="p-12">
      <Title>Dashboard</Title>
      <Text>Proporciona una visión consolidada y en tiempo real de información relevante en un solo vistazo.</Text>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Resumen</Tab>
          <Tab>Detalle</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
              <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                {/* Placeholder to set height */}
                <Flex alignItems="start">
                  <div>
                    <Text>Cantidad de registros:</Text>
                    <Text>Total </Text>
                    <Metric>{feed.length}</Metric>
                  </div>
                </Flex>
                <ProgressBar value={100} className="mt-2" />
              </Card>

              <Card className="max-w-xs mx-auto" decoration="top" decorationColor="emerald"> 
                {/* Placeholder to set height */}
                <Flex alignItems="start">
                  <div>
                    <Text>Cantidad de registros:</Text>
                    <Text>Sano </Text>
                    <Metric>{sano.length}</Metric>
                  </div>
                  <BadgeDelta deltaType="moderateIncrease">{((sano.length/feed.length)*100).toFixed(2)}%</BadgeDelta>
                </Flex>
                
                <ProgressBar value={((sano.length/feed.length)*100)} className="mt-2" color="emerald"/>
              </Card>

              <Card className="max-w-xs mx-auto" decoration="top" decorationColor="pink">
              <Flex alignItems="start">
                  <div>
                    <Text>Cantidad de registros:</Text>
                    <Text>Enfermo </Text>
                    <Metric>{enfermo.length}</Metric>
                  </div>
                  <BadgeDelta deltaType="moderateDecrease">{((enfermo.length/feed.length)*100).toFixed(2)}%</BadgeDelta>
                </Flex>
                <ProgressBar value={((enfermo.length/feed.length)*100)} className="mt-2" color="pink"/>
              </Card>
            </Grid>
            <div className="mt-6">
              <Card>


              <Title>Predicción basada en la fecha de creación</Title>
              <LineChart
                className="mt-6"
                data={feed.map(item => ({ ...item, createdAt: item.createdAt.toLocaleString() }))}
                index="createdAt"
                categories={["predictionValue"]}
                colors={["indigo"]}
                yAxisWidth={40}
              />
              </Card>
            </div>
          </TabPanel>

          <TabPanel>
            <Card>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Age</TableHeaderCell>
                    <TableHeaderCell className="text-right">Sex ($)</TableHeaderCell>
                    <TableHeaderCell className="text-right">ChestPainType ($)</TableHeaderCell>
                    <TableHeaderCell className="text-right">RestingBP</TableHeaderCell>
                    <TableHeaderCell className="text-right">Cholesterol</TableHeaderCell>
                    <TableHeaderCell className="text-right">FastingBS</TableHeaderCell>
                    <TableHeaderCell className="text-right">RestingECG</TableHeaderCell>
                    <TableHeaderCell className="text-right">MaxHR</TableHeaderCell>
                    <TableHeaderCell className="text-right">ExerciseAngina</TableHeaderCell>
                    <TableHeaderCell className="text-right">Oldpeak</TableHeaderCell>
                    <TableHeaderCell className="text-right">ST_Slope</TableHeaderCell>
                    <TableHeaderCell className="text-right">predictionValue</TableHeaderCell>
                  </TableRow>
                </TableHead>
 
                <TableBody>
                  {feed.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.Age}</TableCell>
                      <TableCell className="text-right">{item.Sex}</TableCell>
                      <TableCell className="text-right">{item.ChestPainType}</TableCell>
                      <TableCell className="text-right">{item.RestingBP}</TableCell>
                      <TableCell className="text-right">{item.Cholesterol}</TableCell>
                      <TableCell className="text-right">{item.FastingBS}</TableCell>
                      <TableCell className="text-right">{item.RestingECG}</TableCell>
                      <TableCell className="text-right">{item.MaxHR}</TableCell>
                      <TableCell className="text-right">{item.ExerciseAngina}</TableCell>
                      <TableCell className="text-right">{item.Oldpeak}</TableCell>
                      <TableCell className="text-right">{item.ST_Slope}</TableCell>
                      <TableCell className="text-right">{item.predictionValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabPanel>
          
        </TabPanels>
      </TabGroup>
    </main>
  );
}