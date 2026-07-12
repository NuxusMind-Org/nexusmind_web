import avatar2 from '@/assets/avatar2.png';
import avatar3 from '@/assets/avatar3.png';

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  profession: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: 'Uzun müddət davam edən stress və narahatlıq gündəlik həyatımı çətinləşdirirdi. Kiçik hadisələr belə məni tez yorurdu və fokuslanmaqda çətinlik çəkirdim. Psixoloji dəstək aldıqdan sonra düşüncələrimi daha yaxşı idarə etməyi öyrəndim və zamanla daxili rahatlığım bərpa olundu. İndi özümü daha stabil və güvəndə hiss edirəm.',
    author: 'Samirə.M',
    profession: 'Peşə : Tələbə',
    avatar: avatar2,
  },
  {
    id: 2,
    text: 'Ailə daxilində uzun müddət davam edən gərginlik və emosional laqeydlik mənə ciddi təsir etmişdi. Özümü tez-tez narahat, yorğun və insanlardan uzaq hiss edirdim. Psixoloq dəstəyi ilə bu vəziyyəti anlamağa başladım. Seanslarda hisslərimi ifadə etməyi, sərhədlər qoymağı və stressi idarə etmə texnikalarını öyrəndim. İndi özümü daha stabil hiss edirəm.',
    author: 'Ramal.Ə',
    profession: 'Peşə : İqtisadçı',
    avatar: avatar3,
  },
];
