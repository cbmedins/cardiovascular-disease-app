import Balancer from "react-wrap-balancer";
import Image from "next/image";
import Link from "next/link";
import Github from "@/components/shared/icons/github";
import Card from "@/components/home/card";
import ComponentGrid from "@/components/home/component-grid";

export default async function HomePage() {
  

    return (
      <>
        <div >
          
          <h1
            className=" bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent text-4xl font-bold tracking-[-0.02em] animate-fade-up md:text-7xl text-center"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            <Balancer>Sistema Predictivo de Enfermedades Cardiovasculares</Balancer>
          </h1>
          <p
            className="mt-6 animate-fade-up text-center text-gray-800 opacity-0 md:text-xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Balancer>
            Proyecto de titulacion: Deteccion temprana de enfermedades cardiovasculares mediante un modelo predictivo basado en tecnicas de Deep Learning. 
            </Balancer>
          </p>
  
          </div>
          
          <div className="flex max-w-fit items-center justify-center space-x-2">
              <Link href="form">
                  <div className="group flex max-w-fit items-center justify-center space-x-2 border bg-blue-500 px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black rounded border-b-4 border-blue-700 hover:border-blue-500">
                    <span className="font-semibold">Predicción</span>
                  </div>
                </Link>
                
                <a
                  className="flex max-w-fit items-center justify-center space-x-2 rounded border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800 border-b-4"
                  href="https://github.com/cbmedins"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>
                    <span className="font-semibold">Leer más</span> 
                  </p>
                </a>
                
                <a
                  className="flex max-w-fit items-center justify-center space-x-2 rounded border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800 border-b-4"
                  href="https://github.com/cbmedins"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  <Github />
                  <p>
                    <span className="hidden sm:inline-block font-semibold">Repositorio en</span> GitHub{" "}
                  </p>
                </a>
                  </div>




          <div
            className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >  
          </div>
       
        
        <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, demo, large }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={
              title === "Descripción" ? (
                <ComponentGrid title={""} description={""} demo={undefined} />
              ) : (
                demo
              )
            }
            large={large}
          />
        ))}
      </div>
    </>
  );
}


const features = [
  {
    title: "Descripción del proyecto",
    description:
    "Breve introducción sobre el [proposito del proyecto](https://nextjs.org/).",
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="heart-test " src="/heart_test.svg" width={150} height={150}/>
      </div>
    ),
  },

  {
    title: "ECV",
    description:
      "Contenido educativo sobre las [Enfermedades Cardiovasculares](https://nextjs.org/).",
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="heart-fail " src="/heart_fail.svg" width={180} height={180}/>
      </div>
    ),
  },


  {
    title: "Recursos adicionales",
    description:
      "[Recursos](https://nextjs.org/) relacionados con las enfermedades cardiovasculares y desarrollo del modelo.",
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="heart-model " src="/heart_model.svg" width={200} height={200}/>
      </div>
    ),
  },
  
  
  {
    title: "Demostración interactiva",
    description:
      "[Demostración interactiva](https://nextjs.org/) del modelo predictivo.",
      
      large: true,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="heart-prese " src="/heart_prese.svg" width={280} height={280}/>
      </div>
    ),
  },

  {
    title: "Precisión del modelo",
    description:
      "Descripción de como se recopilaron y utilizaron los datos para entrenar y evaluar el modelo.",
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="heart-presi " src="/heart_presi.svg" width={200} height={200}/>
      </div>
    ),
  },
];