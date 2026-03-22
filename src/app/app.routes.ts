import { Routes } from '@angular/router';

import { Main } from './pages/main/main';
import { Pets } from './pages/pets/pets';
import { About } from './pages/about/about';
import { GoldenRetriever } from './pages/breeds/golden-retriever/golden-retriever';
import { SiberianHusky } from './pages/breeds/siberian-husky/siberian-husky';
import { Beagle } from './pages/breeds/beagle/beagle';
import { GermanShepherd } from './pages/breeds/german-shepherd/german-shepherd';
import { Pomeranian } from './pages/breeds/pomeranian/pomeranian';
import { ShihTzu } from './pages/breeds/shih-tzu/shih-tzu';
import { LabradorRetriever } from './pages/breeds/labrador-retriever/labrador-retriever';
import { FrenchBulldog } from './pages/breeds/french-bulldog/french-bulldog';
import { Dachshund } from './pages/breeds/dachshund/dachshund';
import { Rottweiler } from './pages/breeds/rottweiler/rottweiler';
import { Poodle } from './pages/breeds/poodle/poodle';
import { Maltese } from './pages/breeds/maltese/maltese';
import { BorderCollie } from './pages/breeds/border-collie/border-collie';
import { Chihuahua } from './pages/breeds/chihuahua/chihuahua';
import { Doberman } from './pages/breeds/doberman/doberman';
import { Corgi } from './pages/breeds/corgi/corgi';

import { DogCare } from './pages/dog-care/dog-care';
import { DogNames } from './pages/dog-names/dog-names';

export const routes: Routes = [
  { path: '', component: Main },
  { path: 'pets', component: Pets },
  { path: 'care', component: DogCare },{ path: 'dog-names', component: DogNames },
  { path: 'about', component: About },
  { path: 'pets/golden-retriever', component: GoldenRetriever },
  { path: 'pets/siberian-husky', component: SiberianHusky },
  { path: 'pets/beagle', component: Beagle },
  { path: 'pets/german-shepherd', component: GermanShepherd },
  { path: 'pets/pomeranian', component: Pomeranian },
  { path: 'pets/shih-tzu', component: ShihTzu },
  { path: 'pets/labrador-retriever', component: LabradorRetriever },
  { path: 'pets/french-bulldog', component: FrenchBulldog },
  { path: 'pets/dachshund', component: Dachshund },
  { path: 'pets/rottweiler', component: Rottweiler },
  { path: 'pets/poodle', component: Poodle },
  { path: 'pets/maltese', component: Maltese },
  { path: 'pets/border-collie', component: BorderCollie },
  { path: 'pets/chihuahua', component: Chihuahua },
  { path: 'pets/doberman', component: Doberman },
  { path: 'pets/corgi', component: Corgi },



  { path: '**', redirectTo: '' }
];
