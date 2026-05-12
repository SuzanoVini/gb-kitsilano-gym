// app/lib/supabase/settings.ts
import { supabase } from './client';

// SETTINGS
export const fetchSettings = async (key: string) => {
  const { data, error } = await supabase.from('settings').select('value').eq('key', key).single();

  if (error) {
    console.error(`Error fetching settings for ${key}:`, error);

    // Fallback defaults if database fails
    const defaults: Record<string, string[]> = {
      class_types: [
        'GB1',
        'GB 1/2',
        'GB2',
        'No Gi',
        'Kids 3 - 6 yo',
        'Kids 6 - 8 yo',
        'Kids 7 - 9 yo',
        'Kids All Ages',
        'Kids & Parents',
        'Juniors & Teens',
        "Women's",
        'MUAY THAI',
        'Wrestling',
        'Judo',
        'Jiu-Jitsu Drills',
      ],
      staff_members: [
        'Jack',
        'Steve',
        'Guto',
        'Aaron',
        'Vinicius',
        'Jun',
        'Pato',
        'Ashley',
        'Vicki',
        'Leona',
        'Jinsoo',
        'Matthew',
      ],
      membership_types: ['Integrity', 'Legacy', 'Special', 'ASP'],
      cancellation_reasons: [
        'No time',
        'Moving',
        'Injury',
        'Medical reason',
        'Financial',
        'No interest',
        'Try new sport',
        'Other Gym',
        'Distance from home',
        'Distance from work',
        'Overdue',
        'Other',
        'No reason',
      ],
      hold_reasons: ['Injury', 'Illness', 'Travel', 'Break Time', 'Work', 'No reason', 'Other'],
      age_categories: ['3-6 YO', '7-9 YO', '10-15 YO', 'Adult'],
    };

    return defaults[key] || [];
  }

  return data?.value || [];
};

export const updateSettings = async (key: string, value: unknown[]) => {
  const { error } = await supabase
    .from('settings')
    .update({ value, updated_at: new Date().toISOString() })
    .eq('key', key);

  if (error) {
    console.error(`Error updating settings for ${key}:`, error);
    throw error;
  }

  return true;
};
