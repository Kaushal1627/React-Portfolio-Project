import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "CRUD",
    url: "https://t.me/newthingskauahal_java",
    image: "projects/CRUD.jpg",
    description: "Create,Read,Update,Delete Data from \n DataBase ",
  },
  {
    title: "Weather-Application-java",
    url: "https://t.me/newthingskauahal_java",
    image: "projects/weather.jpg",
    description: "Weather Application using for java",
  },
  {
    title: "MY Portfolio",
    url: "https://t.me/newthingskauahal_java",
    image: "projects/portfoliow.PNG",
    description: "Created a 3D portfolio",
  },
  {
    title: "Banking System",
    url: "https://t.me/newthingskauahal_java",
    image: "projects/Backing.jpg",
    description:
      "Create Account,Debit,Credit \nCheck Balance and Transfer Money",
  },
  {
    title: "Registration Form",
    url: "https://t.me/newthingskauahal_java",
    image: "projects/RegistrationfORM.jpg",
    description: "Registration Form",
  },
  {
    title: "Chat Application",
    url: "https://t.me/newthingskauahal_java",
    image: "projects/Chat.jpg",
    description: "Chat Application at real time",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 1 : 0.5);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={1} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={3}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
