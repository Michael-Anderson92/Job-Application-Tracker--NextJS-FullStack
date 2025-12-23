import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Skeleton } from './ui/skeleton';
import { colors } from '@/lib/design-system';

type StatsCardsProps = {
  title: string;
  value: number;
};

function StatsCards({ title, value }: StatsCardsProps) {
  return (
    <Card
      className='border-2'
      style={{
        backgroundColor: colors.background,
        borderColor: colors.border,
      }}
    >
      <CardHeader className='flex flex-row justify-between items-center'>
        <CardTitle
          className='capitalize font-semibold'
          style={{ color: colors.text }} // Dark green text
        >
          {title}
        </CardTitle>
        <CardDescription
          className='text-4xl font-extrabold mt-[0px!important]'
          style={{ color: colors.accent }} // Teal (accent is now teal)
        >
          {value}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function StatsLoadingCard() {
  return (
    <Card className='w-[330px] h-[88px]'>
      <CardHeader className='flex flex-row justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[150px]' />
            <Skeleton className='h-4 w-[100px]' />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default StatsCards;
