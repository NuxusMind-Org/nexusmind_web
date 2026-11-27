import femaleAvatar from '@/assets/female_avatar.webp';
import maleAvatar from '@/assets/male_avatar.webp';
import singlePerson from '@/assets/single_person.webp';
import couple from '@/assets/couple.webp';
import family from '@/assets/family.webp';
import friends from '@/assets/friends.webp';
import ob0301 from '@/assets/ob0301.webp';
import ob0302 from '@/assets/ob0302.webp';
import ob0303 from '@/assets/ob0303.webp';
import ob0304 from '@/assets/ob0304.webp';
import ob0305 from '@/assets/ob0305.webp';
import ob0306 from '@/assets/ob0306.webp';
import ob0401 from '@/assets/ob0401.webp';
import ob0402 from '@/assets/ob0402.webp';
import ob0403 from '@/assets/ob0403.webp';
import ob0404 from '@/assets/ob0404.webp';
import ob0405 from '@/assets/ob0405.webp';
import ob0406 from '@/assets/ob0406.webp';
import analyzingImage from '@/assets/analyzing.webp';

/**
 * Maps onboarding JSON image filename strings to their imported asset URLs.
 * Centralises all onboarding asset resolution in one place.
 */
export const IMAGE_MAP: Record<string, string> = {
  'female_avatar.png': femaleAvatar,
  'male_avatar.png': maleAvatar,
  'single_person.png': singlePerson,
  'couple.png': couple,
  'family.png': family,
  'friends.png': friends,
  'ob0301.png': ob0301,
  'ob0302.png': ob0302,
  'ob0303.png': ob0303,
  'ob0304.png': ob0304,
  'ob0305.png': ob0305,
  'ob0306.png': ob0306,
  'ob0401.png': ob0401,
  'ob0402.png': ob0402,
  'ob0403.png': ob0403,
  'ob0404.png': ob0404,
  'ob0405.png': ob0405,
  'ob0406.png': ob0406,
  'analyzing.png': analyzingImage,
};
