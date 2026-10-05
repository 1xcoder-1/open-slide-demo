import { defineDeck, slide } from '../core/types';
import { Title } from './Title';
import { CoreIdea } from './CoreIdea';
import { Architecture } from './Architecture';
import { Workflow } from './Workflow';
import { InspectorLoop } from './InspectorLoop';
import { Closing } from './Closing';

export const deck = defineDeck('open-slide, from scratch', [
  slide(
    { id: 'title', title: 'Title', notes: 'Set the stage: open-slide is “the slide framework built for agents”. Press → to start.' },
    Title,
  ),
  slide(
    { id: 'core-idea', title: 'Content / render separation', notes: 'Emphasise: the authoring surface is code, but the runtime owns everything around it.' },
    CoreIdea,
  ),
  slide(
    { id: 'architecture', title: 'Monorepo layout', notes: 'Map the real repo packages to this demo folder.' },
    Architecture,
  ),
  slide(
    { id: 'workflow', title: 'The agent loop', notes: 'Walk through the 5 steps slowly — this is the heart of open-slide.' },
    Workflow,
  ),
  slide(
    { id: 'inspector', title: 'Inspector feedback', notes: 'Demo live: press “inspect”, click an element, add a note, export JSON.' },
    InspectorLoop,
  ),
  slide(
    { id: 'closing', title: 'Takeaways', notes: 'End on what to try next in this sandbox.' },
    Closing,
  ),
]);
