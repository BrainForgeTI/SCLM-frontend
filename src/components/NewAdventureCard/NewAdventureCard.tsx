import { Plus } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const NewAdventureCard = () => {

  return (
    <Card className='w-full h-full rounded-[20px] cursor-pointer bg-transparent'>
      <CardContent className='h-full flex flex-col justify-center items-center text-muted-foreground'>
        <div className='w-[78px] h-[78px] bg-base-content/23 text-base300/70 rounded-[10px] flex justify-center items-center'>
          <Plus />
        </div>
        <span className='font-medium text-lg'>Criar Aventura</span>
      </CardContent>
    </Card>
  )
}

export default NewAdventureCard;
