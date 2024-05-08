import { useState } from "react";
import { Box, Button, Container, Flex, IconButton, Input, Text, useColorMode, VStack, useColorModeValue, Textarea, SimpleGrid, useToast } from "@chakra-ui/react";
import { FaPlus, FaSun, FaMoon, FaTrash } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const handleAddNote = () => {
    if (!inputTitle || !inputContent) {
      toast({
        title: "Error",
        description: "Both title and content are required to add a note.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newNote = {
      id: Date.now(),
      title: inputTitle,
      content: inputContent,
    };
    setNotes([...notes, newNote]);
    setInputTitle("");
    setInputContent("");
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justifyContent="space-between" mb={8}>
        <Text fontSize="2xl" fontWeight="bold">
          Notes App
        </Text>
        <IconButton aria-label="Toggle color mode" icon={colorMode === "light" ? <FaMoon /> : <FaSun />} onClick={toggleColorMode} />
      </Flex>
      <VStack spacing={4}>
        <Input placeholder="Title" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
        <Textarea placeholder="Take a note..." value={inputContent} onChange={(e) => setInputContent(e.target.value)} rows={3} />
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddNote}>
          Add Note
        </Button>
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mt={8}>
        {notes.map((note) => (
          <Box key={note.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" bg={useColorModeValue("white", "gray.700")}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontWeight="bold" fontSize="lg">
                {note.title}
              </Text>
              <IconButton aria-label="Delete note" icon={<FaTrash />} size="sm" onClick={() => handleDeleteNote(note.id)} />
            </Flex>
            <Text mt={4}>{note.content}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;
