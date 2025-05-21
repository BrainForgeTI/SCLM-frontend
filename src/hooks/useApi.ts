import axios from "axios";
import { AdventureCardType } from "../types/AdventureCardType"
import { SignUpFormType } from "../types/auth_types/SignUpFormType";
import { TopicType } from "../types/adventure/TopicType";
import { CreateTopicType } from "../types/adventure/CreateTopicType";
import { CreateChapter } from "../types/adventure/CreateChapter";

export const useApi = () => ({
    getUserAdventures: async (): Promise<AdventureCardType[]> => {
        const response = await axios.get('http://localhost:3001/adventure');
        const adventures = response.data.data; // <- aqui é o array de aventuras

        const formatted: AdventureCardType[] = adventures.map((item: any) => ({
            id: item.id,
            image: item.bannerUrl ?? null,
            colorFrom: item.bgPrimaryColor,
            colorTo: item.bgSecundaryColor,
            imageFile: item.bannerUrl,
            title: item.nameadventure,
            character: null,
            progress: 0,
            chapters: []
        }));
        return formatted;
    },

    createAdventure: async (adventure: AdventureCardType, imageFile: File | null) => {
        const formData = new FormData();
        formData.append('bgPrimaryColor', adventure.colorFrom);
        formData.append('bgSecundaryColor', adventure.colorTo);
        formData.append('nameAdventure', adventure.title);
        formData.append('description', 'Aleatorio');

        if (adventure.character?.id) {
            formData.append('characterId', adventure.character.id);
        }

        if (imageFile) {
            formData.append('banner', imageFile);
        }

        const { data } = await axios.post('http://localhost:3001/adventure', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return data;
    },

    createChapterTopic: async (createTopic: CreateTopicType) => {
        // mockkk
        await new Promise((resolve) => setTimeout(resolve, 500));
        return {
            status: 200,
            message: 'Topic created successfully!',
            topicId: 'mocked-topic-id-123', 
        };
    },

    createChapter: async (createChapter: CreateChapter) => {
        const payload = {
            content: [
                {
                    title: createChapter.chapterTitle,
                    isFinished: false,
                    missions: []
                }
            ]
        };

        const { data } = await axios.post(
            `http://localhost:3001/adventure/${createChapter.adventureId}/content`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        return data;
    },

    getAdventure: async (adventureId: string) => {
        const response = await axios.get(`http://localhost:3001/adventure/${adventureId}`);
        const item = response.data.data;

        if (!item) throw new Error("Adventure not found");

        const formatted: AdventureCardType = {
            id: item.id,
            image: item.bannerUrl ?? null,
            imageFile: item.bannerUrl ?? null,
            colorFrom: item.bgPrimaryColor,
            colorTo: item.bgSecundaryColor,
            title: item.nameAdventure ?? 'Sem título',
            character: item.character ?? null,
            progress: item.progress ?? 0,
            chapters: item.chapters?.map((chapter: any) => ({
                id: chapter.id,
                title: chapter.title,
                expanded: chapter.expanded ?? false,
                notes: chapter.notes ?? '',
                topics: chapter.topics?.map((topic: any) => ({
                    id: topic.id,
                    name: topic.name,
                    completed: topic.completed,
                    chapterId: topic.chapterId,
                })) ?? []
            })) ?? []
        };

        return formatted;
    },

    changeChapterTopicCompleted: async () => {
        let random = Math.floor(Math.random() * 10)
        let response;

        if (random > 4) {
            response = { status: 200 }
        } else {
            response = { status: 500 }
        }

        return response
    },

    signup: async (formData: SignUpFormType) => {
        const res = await axios.post('http://127.0.0.1:3000/auth/signup', formData)

        if (res.status !== 200) {
            throw new Error('Error creating account')
        }

        return true;
    },

    validateEmail: async (email: string) => {
        await axios.post('http://127.0.0.1:3000/auth/validate-email', { email })
    },

    validateToken: async (email: string, token: string) => {
        const res = await axios.post('http://127.0.0.1:3000/auth/validate-token', { email, token });

        if (res.status !== 200) {
            return false;
        }
        return true;
    }
})