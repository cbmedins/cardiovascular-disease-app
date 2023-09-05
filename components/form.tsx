"use client";
import React, { useState, FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import Modal from "@/components/modal";
import Image from 'next/image';

//    console.log(session)

const form: React.FC = () => { 
    const {data: session} = useSession()

    const [age, setCounter] = useState('0');
    const [sex, setSex] = useState('');
    const [chestPainType, setChestPainType] = useState('');
    const [restingBP, setRestingBP] = useState('');
    const [cholesterol, setCholesterol] = useState('');
    const [fastingBS, setFastingBS] = useState('');
    const [restingECG, setRestingECG] = useState('');
    const [maxHR, setMaxHR] = useState('');
    const [exerciseAngina, setExerciseAngina] = useState('');
    const [oldpeak, setOldpeak] = useState('');
    const [ST_Slope, setST_Slope] = useState('');
  
    //const [predictionValue, setPredictionValue] = useState<number | null>(null);
  
    const [predictionValue, setPredictionValue] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const [error, setError] = useState<string | null>(null);
  
    const [isLoading, setIsLoading] = useState(false);
  

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a un servidor.
    console.log('Age:', age);
    console.log('Sex:', sex);
    console.log('ChestPainType:', chestPainType);
    console.log('RestingBP:', restingBP);
    console.log('Cholesterol:', cholesterol);
    console.log('FastingBS:', fastingBS);
    console.log('RestingECG:', restingECG);
    console.log('MaxHR:', maxHR);
    console.log('ExerciseAngina:', exerciseAngina);
    console.log('Oldpeak:', oldpeak);
    console.log('ST_Slope:', ST_Slope);

    console.log('Session iniciada por: ', session?.user?.email)
    
    setIsLoading(true); // Inicia la carga

    const data = {
      Age: parseInt(age),
      Sex: parseInt(sex),
      ChestPainType: parseInt(chestPainType),
      RestingBP: parseInt(restingBP),
      Cholesterol: parseInt(cholesterol),
      FastingBS: parseInt(fastingBS),
      RestingECG: parseInt(restingECG),
      MaxHR: parseInt(maxHR),
      ExerciseAngina: parseInt(exerciseAngina),
      Oldpeak: parseFloat(oldpeak),
      ST_Slope: parseInt(ST_Slope),

    
      
    };
    const mockApiResponse = {
      ok: true,
      json: async () => ({ prediction: 75 }),
    };

  try {
   // const response = await fetch('https://modelo-docker.onrender.com/predict/', {
    const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Resultado del servidor:', result);
        setPredictionValue(result.prediction);

        


        // Abre el modal
        setIsModalOpen(true);
      } else {
        console.error('Error al enviar los datos al servidor.');
        setError('Error al enviar los datos al servidor.');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setError('Error de conexión.  ');
    } finally {
      setIsLoading(false); // Finaliza la carga, ya sea éxito o error
    }
  };
 
  //console.log('Contenido de session:', //email);

  return (
    <div className="p-4">
    <br />
      <h1 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">Formulario para la predicción</h1>      
      <br />  
      
      <form onSubmit={handleSubmit} className="space-y-4">           
      
    

      <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-x font-bold text-transparent">Sección de Información Personal:</h2>
        
        <div>
            <label htmlFor="sex">Sexo:</label>
            <div className="flex">
                <select
                    id="sex"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    >
                    <option value="" disabled></option>
                    <option value="0">Masculino</option>
                    <option value="1">Femenino</option>
                </select>
                
            </div>
        </div>

        
        <div>
          <label>Edad:
            <div className="flex">
              <button className="bg-blue-500 text-white px-12 py-2 rounded" onClick={() => setCounter((parseInt(age) - 1).toString())}>
                <span>−</span>
              </button>
              <input
                type="number"
                name="custom-input-number"
                value={age === '' ? '0' : age}
                onChange={(e) => setCounter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-center"
              />
              <button className="bg-blue-500 text-white px-12 py-2 rounded" onClick={() => setCounter((parseInt(age) + 1).toString())}>
                <span>+</span>
              </button>
            </div>
          </label>
        </div>

        <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-x font-bold text-transparent">Sección de Datos Médicos Generales:</h2>  


        <div>
          <label htmlFor="chestPainType">Tipo de Dolor de Pecho:</label>
          <div className="flex">
                <select
                    id="chestPainType"
                    value={chestPainType}
                    onChange={(e) => setChestPainType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    >
                    <option value="0">ASY Asintomático</option>
                    <option value="1">ATA Angina Atípica</option>
                    <option value="2">NAP Dolor No Anginoso</option>
                    <option value="3">TA Angina Típica</option>
                </select>
                
            </div>
            
          
        </div>

        <div>
          <label htmlFor="restingBP">Presión Arterial en Reposo:</label>
        <div className="flex">
          <input
            type="text"
            id="restingBP"
            value={restingBP}
            onChange={(e) => setRestingBP(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
         
          </div>
        </div>

        <div>
          <label htmlFor="cholesterol">Nivel de Colesterol:</label>
          <div className="flex">
          <input
            type="text"
            id="cholesterol"
            value={cholesterol}
            onChange={(e) => setCholesterol(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          
          </div>
        </div>

        <div>
          <label htmlFor="fastingBS">Nivel de Azúcar en Sangre en Ayunas:</label>
          <div >
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">

              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    type="radio"
                    id="fastingBS1"
                    name="fastingBS"
                    value="1"
                    onChange={(e) => setFastingBS(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label 
                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mayor que 120 mg/dl</label>
                </div>
              </li>

              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    type="radio"
                    id="fastingBS0"
                    name="fastingBS"
                    value="0"
                    onChange={(e) => setFastingBS(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  <label 
                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Menor o igual a 120 mg/dl</label>
                </div>
              </li>
            </ul>
        </div>
        </div>
        
        <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-x font-bold text-transparent">Sección de Resultados de Pruebas:</h2> 

        <div>
          <label htmlFor="restingECG">Resultados del Electrocardiograma en Reposo:</label>
          <div className="flex">
            
            <select
                id="restingECG"
                value={restingECG}
                onChange={(e) => setRestingECG(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                >
                <option value="0">LVH</option>
                <option value="1">Normal</option>
                <option value="2">St</option>
            </select>
            

                  </div>

        </div>

        <div>
          <label htmlFor="maxHR">Ritmo Cardíaco Máximo Alcanzado:</label>
          <div className="flex">

          <input
            type="text"
            id="maxHR"
            value={maxHR}
            onChange={(e) => setMaxHR(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            />
         
            </div>
        </div>


        <div>
          <label htmlFor="exerciseAngina">Angina Inducida por Ejercicio:</label>
          <div >
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">

              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    type="radio"
                    id="exerciseAngina1"
                    name="exerciseAngina"
                    value="1"
                    onChange={(e) => setExerciseAngina(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label 
                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Si </label>
                </div>
              </li>

              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    type="radio"
                    id="exerciseAngina0"
                    name="exerciseAngina"
                    value="0"
                    onChange={(e) => setExerciseAngina(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  <label 
                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No </label>
                </div>
              </li>
            </ul>
        </div>
        </div>


        <div>
          <label htmlFor="oldpeak">Depresión del Segmento ST:</label>
          <div className="flex">
          <input
            type="text"
            id="oldpeak"
            value={oldpeak}
            onChange={(e) => setOldpeak(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          
            </div>
        </div>

        
        <div>
          <label htmlFor="ST_Slope">Inclinación o pendiente del segmento ST:</label>
          <div className="flex">
            
            <select
                id="ST_Slope"
                value={ST_Slope}
                onChange={(e) => setST_Slope(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                >
                <option value="0">Up</option>
                <option value="1">Flat</option>
                <option value="2">Down</option>
            </select>
            

                  </div>

        </div>

        
        <br />



        {/* Agrega más campos aquí según los requisitos */}
        <button type="submit" className={"group flex max-w-fit items-center justify-center space-x-2 border bg-blue-500 px-10 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black rounded border-b-4 border-blue-700 hover:border-blue-500"}>
          {isLoading ? (
            <>
            <Image src="/heart_split.png" alt="loading"  className="w-6 h-6 animate-spin" width={25} height={25}/>
            
            
            </>
          ) : (
            'Enviar'
          )}
        </button>

        {error && (
        <div className="text-red-600 mb-4">
          <p>Error: {error}</p>
        </div>
      )}
      

      </form>

      
      <Modal showModal={isModalOpen} setShowModal={setIsModalOpen}>
        <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
        <a href="https://codytech.dev">
        <Image
          src="/CardioBlue.png"
          alt="Cardio Logo"
          className="h-10 w-10 "
              width={20}
              height={20}
        />
      </a>
          El valor de la predicción es: {predictionValue}
          <p className="text-sm text-gray-500">
          El resultado de la predicción indica que la persona está clasificada como {' '}
          <span className="font-bold">
          {predictionValue === 1 ? 'Enferma' : 'Sana'}
          </span>{' '}
          según el criterio de este prototipo. Esto implica que {' '}
          {predictionValue === 1
          ? 'se ha detectado una condición de enfermedad cardiovascular o un riesgo elevado de desarrollarla.'
          : 'no se ha detectado una condición de enfermedad cardiovascular o un riesgo elevado de desarrollarla.'}
     
          </p>
          <button
            className={"group flex max-w-fit items-center justify-center space-x-2 border bg-blue-500 px-10 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black rounded border-b-4 border-blue-700 hover:border-blue-500"}
            onClick={()=> {

              setIsModalOpen(false)
              window.location.href = '/'; // Redirige a la página de inicio

            } }
            
          >
            Cerrar
          </button>
        </div>
        </div>
        
      </Modal>


     

      
      

    </div>
  );
};

export default form;
