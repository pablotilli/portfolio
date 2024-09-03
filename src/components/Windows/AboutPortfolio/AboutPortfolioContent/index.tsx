import React, { RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Section } from './Section';
import Titlebar from '../../../Titlebar/TitleBar';

const AppContainer = styled.div`
  display: flex;
  height: calc(100% - 95px);
  width: 100%;
`;

const ContentContainer = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

const DesktopTextContainer = styled.div`
  width: 94%;
  padding: 30px 0;

  p {
    margin: 20px 0;
    font-size: 1.2rem;
  }
`;

const MobileTextContainer = styled.div`
  padding: 30px 0;

  p {
    margin: 0 20px;
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
`;

interface IdeaSectionContentProps {
  isLarge: boolean;
}

const IdeaSectionContent = styled.div<IdeaSectionContentProps>`
  display: flex;
  flex-direction: ${({ isLarge }) => (isLarge ? 'row' : 'column')};
`;

interface MobileSectionContentProps {
  isLarge: boolean;
}

const MobileSectionContent = styled.div<MobileSectionContentProps>`
  display: flex;
  flex-direction: ${({ isLarge }) => (isLarge ? 'row' : 'column')};

  justify-content: center;
  width: 90%;
  background: white;
  color: black;
  padding: 30px;
  border: 1px solid black;
  border-radius: 15px;
  box-shadow: rgb(0 0 0 / 69%) 0px 0px 12px 0px;
`;

interface MainContentProps {
  sectionsRefs: RefObject<HTMLElement>[];
  contentRef: RefObject<HTMLDivElement>;
}

const AboutPortfolioContent: React.FC<MainContentProps> = ({
  sectionsRefs,
  contentRef,
}) => {
  const parallaxRefs: RefObject<HTMLDivElement>[] = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  /*   useEffect(() => console.log({ parallaxRefs }), [parallaxRefs]);

  useEffect(() => {
    const handleScroll = () => {
      parallaxRefs.forEach((sectionRef) => {
        console.log({ sectionRef });
        const section = sectionRef.current;
        if (section) {
          const offset = contentRef.current?.scrollTop || 0;
      
          section.style.backgroundPosition = `center ${offset * 0.2}px`;
        }
      });
    };

    const contentElement = contentRef.current;
    contentElement?.addEventListener('scroll', handleScroll);

    return () => {
      contentElement?.removeEventListener('scroll', handleScroll);
    };
  }, [parallaxRefs, contentRef]); */

  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        const mainDivWidth = contentRef.current.clientWidth;
        setIsLarge(mainDivWidth > 900);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  console.log({ isLarge });

  return (
    <AppContainer>
      <ContentContainer ref={contentRef}>
        <Section id="section-0" ref={sectionsRefs[0]} title="">
          <IdeaSectionContent isLarge={isLarge}>
            <img
              src="/images/about_section/rubik-cube.png"
              alt="Pablo Tilli Portfolio - Rubik cube"
              style={{
                objectFit: 'contain',
                width: '20vw',
                marginRight: '30px',
                filter: 'drop-shadow(2px 4px 6px black)',
              }}
            />
            <div
              style={{
                backgroundColor: '#ff272736',
                padding: '20px',
                width: '100%',
                borderRadius: '4px',
              }}
            >
              <h2>La Idea</h2>
              <p>
                A lo largo de mi carrera profesional he estado en constante
                búsqueda de nuevas formas de innovar y destacar no solo mis
                habilidades técnicas, sino también mi enfoque en la experiencia
                del usuario.
              </p>
              <p>
                Siempre he creído que un portafolio debe ser más que una simple
                recopilación de proyectos.
              </p>
              <p>
                Fue esta combinación de factores lo que me llevó a concebir y
                desarrollar un portafolio interactivo que vaya más allá de lo
                convencional, ofreciendo una experiencia distinta tanto en
                desktop como en dispositivos móviles.
              </p>
              <p>
                La idea de crear un portafolio que emulara una computadora y un
                dispositivo móvil surgió de mi deseo de romper con la estructura
                tradicional de los sitios de portafolio.
              </p>
              <p>
                Quería algo que no solo presentara mi trabajo, sino que
                involucrara a los visitantes de una manera más dinámica e
                inmersiva. La idea fue trasladar la familiaridad que todos
                tenemos con nuestras propias computadoras y celulares, haciendo
                que la navegación fuera intuitiva y, al mismo tiempo, divertida.
              </p>
            </div>
          </IdeaSectionContent>
        </Section>

        <Section
          id="section-1"
          ref={sectionsRefs[1]}
          title="Experiencia Desktop"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            background: 'white',
            color: 'black',
          }}
        >
          <div
            style={{
              width: '90%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              background: 'white',
              color: 'black',
              border: '1px solid black',
              borderRadius: '15px',
              boxShadow: 'rgb(0 0 0 / 69%) 0px 0px 12px 0px',
            }}
          >
            <Titlebar
              onMinimize={() => {}}
              onRestore={() => {}}
              onClose={() => {}}
              active
            />
            <video
              style={{
                aspectRatio: '2 / 0.8',
                width: '94%',
                marginTop: '30px',
                border: '1px solid black',
              }}
              src="/videos/demo_1.webm"
              autoPlay
              loop
              muted
            ></video>
            <DesktopTextContainer>
              <p>
                En la versión desktop de mi portafolio, los usuarios se
                encuentran con un entorno que replica una computadora de
                escritorio. Aquí, cada sección está representada como un
                programa diferente que puede abrirse y explorarse.
              </p>
              <p>
                Desde el primer momento, los visitantes ven un escritorio con
                íconos que representan cada sección clave: un dock que facilita
                la navegación y la sensación de estar realmente interactuando
                con una computadora. Uno de los programas es mi CV, donde he
                presentado parte de mi trayectoria profesional. Además, en la
                "app" de documentos, los usuarios pueden descargar una versión
                en PDF de mi currículum, lo que facilita que tengan una copia
                física o digital de mi experiencia y habilidades. Otra sección
                es la carpeta de imágenes, donde he recopilado imagenes de
                varias de las tecnologías que domino, brindando una vista rápida
                de mis capacidades técnicas. Además se puede encontrar en el
                escritorio una "app" para contactarme.
              </p>
              <p>
                He querido ofrecer también a los usuarios la posibilidad de
                personalizar su experiencia, reflejando así uno de los
                principios que más valoro en el desarrollo: la adaptabilidad.
                Por ello, inclui opciones de configuración que permiten cambiar
                el fondo de pantalla, modificar el esquema de colores para
                adaptarse a diferentes preferencias visuales y seleccionar el
                idioma de navegación. Incluso he añadido la posibilidad de
                agregar o quitar widgets, permitiendo una personalización que
                hace que cada visita al portafolio pueda ser diferente.
              </p>
            </DesktopTextContainer>
          </div>
        </Section>

        {/*         <Section
          id="section-parallax"
          ref={parallaxRefs[1]}
          title=""
          style={{
            height: '500px',
            backgroundImage:
              'url(/images/about_section/mobile_version_header.png)',
            backgroundColor: 'white',
            backgroundPosition: 'top',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '400px',
            padding: '20px',
            paddingBottom: '0',
            color: 'black',
          }}
        ></Section> */}

        <Section
          id="section-2"
          ref={sectionsRefs[2]}
          title="Experiencia Móvil"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <MobileSectionContent isLarge={isLarge}>
            {/*             <img
              src="/images/about_section/mobile_version.png"
              alt="Pablo Tilli Portfolio - Mobile version"
            /> */}
            <video
              style={{
                height: '100%',
                /* marginTop: '30px', */
              }}
              src="/videos/demo_mobile_1.webm"
              autoPlay
              loop
              muted
            ></video>
            <MobileTextContainer>
              <p>
                Cuando pensé en cómo adaptar esta experiencia a dispositivos
                móviles, me di cuenta de que necesitaba un enfoque que
                mantuviera el concepto central de interacción, pero que también
                respetara las limitaciones y oportunidades de las pantallas más
                pequeñas. Así, en la versión mobile de mi portafolio, trasladé
                el concepto de la computadora a una emulación de la interfaz de
                un celular. Esto no solo preserva la idea de interactividad,
                sino que también garantiza que el portafolio sea accesible y
                usable en cualquier dispositivo, lo que es crucial en un mundo
                donde el tráfico móvil sigue creciendo.
              </p>
              <p>
                La versión mobile ofrece una navegación sencilla y mantiene las
                opciones de personalización, asegurando que los usuarios tengan
                una experiencia tan rica y ajustada a sus preferencias como en
                la versión desktop.
              </p>
            </MobileTextContainer>
          </MobileSectionContent>
        </Section>

        <Section id="section-3" ref={sectionsRefs[3]} title="Conclusión">
          A través de este portafolio, no solo he querido mostrar lo que sé
          hacer, sino también cómo lo hago, destacando mi enfoque en la
          experiencia del usuario, la adaptabilidad, y la capacidad de
          transformar ideas en productos digitales que son tanto funcionales
          como visualmente atractivos. Este proyecto es una culminación de mi
          pasión por la tecnología y la innovación, y refleja mi compromiso con
          la creación de experiencias digitales que sean tanto prácticas como
          emocionantes.
        </Section>

        <Section id="section-4" ref={sectionsRefs[4]} title="Tecnologías">
          hhh
        </Section>
      </ContentContainer>
    </AppContainer>
  );
};

export default AboutPortfolioContent;
