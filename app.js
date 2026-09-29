const categoryOrder = [
  'Todos',
  'Animales',
  'Fantasía',
  'Aventuras',
  'Amistad',
  'Valores',
  'Educativos',
  'Cuentos clásicos',
  'Naturaleza',
];

const supabaseConfig = window.SUPABASE_CONFIG || {};
const supabaseClient = window.supabase
  && supabaseConfig.url
  && supabaseConfig.anonKey
  && !supabaseConfig.url.includes('TU_PROJECT_REF')
  && !supabaseConfig.anonKey.includes('TU_SUPABASE_ANON_KEY')
  ? window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })
  : null;

const storyFiles = [
  '01-caperucita-roja.md',
  '02-cenicienta.md',
  '03-blancanieves-y-los-siete-enanitos.md',
  '04-pinocho.md',
  '05-hansel-y-gretel.md',
  '06-el-gato-con-botas.md',
  '07-ricitos-de-oro-y-los-tres-osos.md',
  '08-el-patito-feo.md',
  '09-la-bella-durmiente.md',
  '10-la-liebre-y-la-tortuga.md',
  '11-el-leon-y-el-raton.md',
  '12-el-flautista-de-hamelin.md',
  '13-juan-y-las-habichuelas-magicas.md',
  '14-pulgarcito.md',
  '15-la-sirenita.md',
  '16-el-soldadito-de-plomo.md',
  '17-el-pastor-mentiroso.md',
  '18-la-cigarra-y-la-hormiga.md',
  '19-la-zorra-y-las-uvas.md',
  '20-el-traje-nuevo-del-emperador.md',
  '21-el-principe-feliz.md',
  '22-el-gigante-egoista.md',
  '23-la-gallina-de-los-huevos-de-oro.md',
  '24-aladino-y-la-lampara-maravillosa.md',
  '25-alicia-en-el-pais-de-las-maravillas.md',
  '26-peter-pan.md',
  '27-el-mago-de-oz.md',
  '28-el-cascanueces.md',
  '29-la-princesa-y-el-guisante.md',
  '30-el-flautista-y-la-princesa.md',
  '31-la-bella-y-la-bestia.md',
  '32-los-tres-mosqueteros.md',
  '33-rapunzel.md',
  '34-los-tres-cerditos.md',
  '35-el-principe-rana.md',
  '36-los-musicos-de-bremen.md',
  '37-el-principito.md',
  '38-heidi.md',
  '39-matilda.md',
  '40-charlie-y-la-fabrica-de-chocolate.md',
];

const storyCategoryMap = {
  '01-caperucita-roja.md': ['Cuentos clásicos', 'Aventuras', 'Naturaleza', 'Valores'],
  '02-cenicienta.md': ['Cuentos clásicos', 'Fantasía', 'Valores'],
  '03-blancanieves-y-los-siete-enanitos.md': ['Cuentos clásicos', 'Fantasía', 'Amistad'],
  '04-pinocho.md': ['Cuentos clásicos', 'Fantasía', 'Aventuras', 'Valores'],
  '05-hansel-y-gretel.md': ['Cuentos clásicos', 'Aventuras', 'Fantasía'],
  '06-el-gato-con-botas.md': ['Cuentos clásicos', 'Aventuras', 'Animales'],
  '07-ricitos-de-oro-y-los-tres-osos.md': ['Cuentos clásicos', 'Animales', 'Valores'],
  '08-el-patito-feo.md': ['Cuentos clásicos', 'Animales', 'Valores'],
  '09-la-bella-durmiente.md': ['Cuentos clásicos', 'Fantasía'],
  '10-la-liebre-y-la-tortuga.md': ['Cuentos clásicos', 'Animales', 'Valores', 'Educativos'],
  '11-el-leon-y-el-raton.md': ['Cuentos clásicos', 'Animales', 'Valores', 'Amistad'],
  '12-el-flautista-de-hamelin.md': ['Cuentos clásicos', 'Aventuras', 'Fantasía'],
  '13-juan-y-las-habichuelas-magicas.md': ['Cuentos clásicos', 'Aventuras', 'Fantasía'],
  '14-pulgarcito.md': ['Cuentos clásicos', 'Aventuras', 'Fantasía'],
  '15-la-sirenita.md': ['Cuentos clásicos', 'Fantasía', 'Aventuras', 'Naturaleza'],
  '16-el-soldadito-de-plomo.md': ['Cuentos clásicos', 'Aventuras', 'Amistad'],
  '17-el-pastor-mentiroso.md': ['Cuentos clásicos', 'Animales', 'Valores'],
  '18-la-cigarra-y-la-hormiga.md': ['Cuentos clásicos', 'Animales', 'Valores', 'Educativos'],
  '19-la-zorra-y-las-uvas.md': ['Cuentos clásicos', 'Animales', 'Valores'],
  '20-el-traje-nuevo-del-emperador.md': ['Cuentos clásicos', 'Valores', 'Educativos'],
  '21-el-principe-feliz.md': ['Cuentos clásicos', 'Valores', 'Amistad'],
  '22-el-gigante-egoista.md': ['Cuentos clásicos', 'Valores', 'Amistad', 'Naturaleza'],
  '23-la-gallina-de-los-huevos-de-oro.md': ['Cuentos clásicos', 'Animales', 'Valores'],
  '24-aladino-y-la-lampara-maravillosa.md': ['Cuentos clásicos', 'Fantasía', 'Aventuras'],
  '25-alicia-en-el-pais-de-las-maravillas.md': ['Cuentos clásicos', 'Fantasía', 'Aventuras'],
  '26-peter-pan.md': ['Cuentos clásicos', 'Fantasía', 'Aventuras', 'Amistad'],
  '27-el-mago-de-oz.md': ['Cuentos clásicos', 'Fantasía', 'Aventuras', 'Amistad'],
  '28-el-cascanueces.md': ['Cuentos clásicos', 'Fantasía', 'Aventuras'],
  '29-la-princesa-y-el-guisante.md': ['Cuentos clásicos', 'Fantasía', 'Valores'],
  '30-el-flautista-y-la-princesa.md': ['Cuentos clásicos', 'Fantasía', 'Aventuras', 'Amistad'],
  '31-la-bella-y-la-bestia.md': ['Cuentos clásicos', 'Fantasía', 'Valores'],
  '32-los-tres-mosqueteros.md': ['Cuentos clásicos', 'Aventuras', 'Amistad', 'Valores'],
  '33-rapunzel.md': ['Cuentos clásicos', 'Fantasía', 'Valores'],
  '34-los-tres-cerditos.md': ['Cuentos clásicos', 'Animales', 'Valores', 'Aventuras'],
  '35-el-principe-rana.md': ['Cuentos clásicos', 'Fantasía', 'Valores', 'Amistad'],
  '36-los-musicos-de-bremen.md': ['Cuentos clásicos', 'Animales', 'Aventuras', 'Amistad'],
  '37-el-principito.md': ['Cuentos clásicos', 'Fantasía', 'Valores', 'Amistad'],
  '38-heidi.md': ['Cuentos clásicos', 'Naturaleza', 'Valores', 'Amistad'],
  '39-matilda.md': ['Cuentos clásicos', 'Educativos', 'Valores'],
  '40-charlie-y-la-fabrica-de-chocolate.md': ['Cuentos clásicos', 'Fantasía', 'Valores', 'Educativos'],
};

const storyImageMap = {
  '01-caperucita-roja.md': 'assets/imagenes cuentos/Caperucita Roja.jpeg',
  '02-cenicienta.md': 'assets/imagenes cuentos/cenicienta.jpg',
  '03-blancanieves-y-los-siete-enanitos.md': 'assets/imagenes cuentos/blanca nieves.jpg',
  '04-pinocho.md': 'assets/imagenes cuentos/Pinocho.jpeg',
  '05-hansel-y-gretel.md': 'assets/imagenes cuentos/Hansel y Gretel.jpeg',
  '06-el-gato-con-botas.md': 'assets/imagenes cuentos/gato con botas portada.jpg',
  '07-ricitos-de-oro-y-los-tres-osos.md': 'assets/imagenes cuentos/ricitos de oro portada.jpg',
  '08-el-patito-feo.md': 'assets/imagenes cuentos/patito feo portada.jpg',
  '09-la-bella-durmiente.md': 'assets/imagenes cuentos/la bella durmiente.jpg',
  '10-la-liebre-y-la-tortuga.md': 'assets/imagenes cuentos/la liebre y la tortuga.jpg',
  '11-el-leon-y-el-raton.md': 'assets/imagenes cuentos/El leon y el raton.jpeg',
  '12-el-flautista-de-hamelin.md': 'assets/imagenes cuentos/El flautista de Hamelin.jpeg',
  '13-juan-y-las-habichuelas-magicas.md': 'assets/imagenes cuentos/Juan y las habichuelas mágicas.jpeg',
  '14-pulgarcito.md': 'assets/imagenes cuentos/pulgarcito.jpg',
  '15-la-sirenita.md': 'assets/imagenes cuentos/La Sirenita.jpeg',
  '16-el-soldadito-de-plomo.md': 'assets/imagenes cuentos/El Soldadito de Plomo.jpeg',
  '17-el-pastor-mentiroso.md': 'assets/imagenes cuentos/El pastor mentiroso.jpeg',
  '18-la-cigarra-y-la-hormiga.md': 'assets/imagenes cuentos/La cigarra y la hormiga.jpeg',
  '19-la-zorra-y-las-uvas.md': 'assets/imagenes cuentos/La zorra y las uvas.jpeg',
  '20-el-traje-nuevo-del-emperador.md': 'assets/imagenes cuentos/El traje nuevo de emperador.jpeg',
  '21-el-principe-feliz.md': 'assets/imagenes cuentos/El principe feliz.jpeg',
  '22-el-gigante-egoista.md': 'assets/imagenes cuentos/El gigante egoísta.jpeg',
  '23-la-gallina-de-los-huevos-de-oro.md': 'assets/imagenes cuentos/La gallina de los huevos de oro.jpeg',
  '24-aladino-y-la-lampara-maravillosa.md': 'assets/imagenes cuentos/Aladino y la lámpara maravillosa.jpeg',
  '25-alicia-en-el-pais-de-las-maravillas.md': 'assets/imagenes cuentos/alicia en el pais de las maravillas.jpg',
  '26-peter-pan.md': 'assets/imagenes cuentos/peter pan.jpg',
  '27-el-mago-de-oz.md': 'assets/imagenes cuentos/el mago de oz.jpeg',
  '28-el-cascanueces.md': 'assets/imagenes cuentos/el cascanueces.jpeg',
  '29-la-princesa-y-el-guisante.md': 'assets/imagenes cuentos/la princesa y el guisante.jpeg',
  '30-el-flautista-y-la-princesa.md': 'assets/imagenes cuentos/El flautista y la princesa.jpeg',
  '31-la-bella-y-la-bestia.md': 'assets/imagenes cuentos/la bella y la bestia.jpg',
  '32-los-tres-mosqueteros.md': 'assets/imagenes cuentos/Los 3 mosqueteros.jpeg',
  '33-rapunzel.md': 'assets/imagenes cuentos/Rapunzel.jpeg',
  '34-los-tres-cerditos.md': 'assets/imagenes cuentos/Los 3 cerditos.jpeg',
  '35-el-principe-rana.md': 'assets/imagenes cuentos/El principe rana.jpeg',
  '36-los-musicos-de-bremen.md': 'assets/imagenes cuentos/Los musicos de bremen.jpeg',
  '37-el-principito.md': 'assets/imagenes cuentos/el principito.jpeg',
  '38-heidi.md': 'assets/imagenes cuentos/heidi.jpeg',
  '39-matilda.md': 'assets/imagenes cuentos/Matilda.jpeg',
  '40-charlie-y-la-fabrica-de-chocolate.md': 'assets/imagenes cuentos/Charlie y la fabrica de chocolate.jpeg',
};

function fallbackStoryCover(title, fileName) {
  return storyImageMap[fileName] || '';
}

function createStoryQuiz(title, paragraphs) {
  const summaries = paragraphs
    .map((paragraph) => paragraph.match(/^.*?[.!?](?:\s|$)/)?.[0].trim() || paragraph.trim())
    .map((summary) => summary.replace(/\s+/g, ' ').split(' ').slice(0, 8).join(' '))
    .filter(Boolean);
  const mainCharacter = title
    .split(/\s+y\s+/i)[0]
    .replace(/^(el|la|los|las)\s+/i, '')
    .trim();
  const sequenceQuestions = [
    '¿Qué vemos en este cuento?',
    '¿Qué hace el protagonista?',
    '¿En qué lugar está?',
    '¿Qué quiere conseguir?',
    '¿Qué dificultad encuentra?',
    '¿Quién aparece para ayudar?',
    '¿Cómo se siente al final?',
    '¿Qué aprendemos con esta historia?',
  ];
  const getOptions = (answer, otherOptions) => [answer, ...otherOptions.filter((option) => option && option !== answer)].slice(0, 2);

  return Array.from({ length: 10 }, (_, index) => {
    if (index === 0) {
      return {
        question: '¿Cuál es el nombre de la historia?',
        options: getOptions(title, ['El cuento de la luna']),
        answer: title,
      };
    }
    if (index === 1) {
      return {
        question: '¿Cómo se llama el protagonista?',
        options: getOptions(mainCharacter, ['un dragón']),
        answer: mainCharacter,
      };
    }

    const answer = summaries[(index - 2) % summaries.length] || `La historia de ${title} continúa.`;
    const otherSummaries = summaries.filter((summary) => summary !== answer);
    return {
      question: sequenceQuestions[index - 2],
      options: getOptions(answer, otherSummaries),
      answer,
    };
  });
}

function parseQuestionsMarkdown(markdown) {
  const storySections = [...markdown.matchAll(/^#{1,2}\s+\d+\.\s+(.+)$/gm)];
  return storySections.map((section, sectionIndex) => {
    const sectionStart = section.index + section[0].length;
    const sectionEnd = storySections[sectionIndex + 1]?.index || markdown.length;
    const sectionText = markdown.slice(sectionStart, sectionEnd);
    return [...sectionText.matchAll(/\*\*(\d+)\.\s+(.+?)\*\*\s*\n([\s\S]*?)\*\*Respuesta:\s*([A-D])\*\*/g)].map((match) => {
      const options = [...match[3].matchAll(/^[A-D]\)\s+(.+)$/gm)].map((option) => option[1].trim());
      const answerIndex = match[4].charCodeAt(0) - 'A'.charCodeAt(0);
      return {
        question: match[2].trim(),
        options,
        answer: options[answerIndex] || options[0],
      };
    });
  });
}

let stories = [];
let storedStoryVideos = {};
let storedCustomStories = [];
let remoteStoryVideos = {};

async function getCurrentUserId() {
  if (!supabaseClient?.auth?.getUser) return null;
  const { data, error } = await supabaseClient.auth.getUser();
  if (error || !data?.user) return null;
  return data.user.id;
}

async function ensureUserProfile() {
  if (!supabaseClient) return null;
  const userId = await getCurrentUserId();
  if (!userId) return null;

  const { data: existingProfile, error: lookupError } = await supabaseClient
    .from('user_data')
    .select('user_id')
    .eq('user_id', userId)
    .maybeSingle();

  if (lookupError && lookupError.code !== 'PGRST116') {
    console.error('No se pudo comprobar el perfil del usuario:', lookupError);
    return null;
  }

  if (!existingProfile) {
    const { error: insertError } = await supabaseClient
      .from('user_data')
      .insert({
        user_id: userId,
        favorites: [],
        progress: {},
        purchases: [],
        custom_stories: [],
        custom_characters: [],
      });

    if (insertError && insertError.code !== '23505') {
      console.error('No se pudo crear el perfil del usuario:', insertError);
      return null;
    }
  }

  return userId;
}

async function upsertUserProfile() {
  if (!supabaseClient) return;
  const userId = await ensureUserProfile();
  if (!userId) return;

  const payload = {
    user_id: userId,
    favorites: state.favorites,
    progress: state.progress,
    purchases: state.purchases,
    custom_stories: stories.filter((story) => story.custom),
    custom_characters: characters.filter((character) => character.custom),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabaseClient.from('user_data').upsert(payload, { onConflict: 'user_id' });
  if (error) {
    console.error('No se pudo guardar la información del usuario en la base de datos:', error);
  }
}

let profileSaveQueue = Promise.resolve();
let librarySaveQueue = Promise.resolve();
let storyVideoSaveQueue = Promise.resolve();

function queueUserProfileSave() {
  if (!supabaseClient) return;
  profileSaveQueue = profileSaveQueue
    .catch(() => {})
    .then(() => upsertUserProfile());
}

async function upsertLibraryProgress() {
  if (!supabaseClient) return;
  const userId = await getCurrentUserId();
  if (!userId) return;

  const { error } = await supabaseClient.from('user_library_progress').upsert({
    user_id: userId,
    favorites: state.favorites,
    progress: state.progress,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
  if (error) {
    console.error('No se pudo guardar favoritos y logros:', error);
  }
}

function queueLibraryProgressSave() {
  if (!supabaseClient) return;
  librarySaveQueue = librarySaveQueue
    .catch(() => {})
    .then(() => upsertLibraryProgress());
}

function mergeProgress(remoteProgress, localProgress) {
  const merged = { ...remoteProgress, ...localProgress };
  const numericKeys = ['readStories', 'listened', 'watched', 'activities', 'colored'];
  numericKeys.forEach((key) => {
    merged[key] = Math.max(Number(remoteProgress[key] || 0), Number(localProgress[key] || 0));
  });
  ['readStoryIds', 'completedActivityIds'].forEach((key) => {
    merged[key] = [...new Set([
      ...(Array.isArray(remoteProgress[key]) ? remoteProgress[key] : []),
      ...(Array.isArray(localProgress[key]) ? localProgress[key] : []),
    ])];
  });
  merged.readStories = Math.max(merged.readStories, merged.readStoryIds.length);
  return merged;
}

async function loadUserProfile() {
  if (!supabaseClient) return;
  const userId = await ensureUserProfile();
  if (!userId) return;

  const { data, error } = await supabaseClient
    .from('user_data')
    .select('favorites, progress, purchases, custom_stories, custom_characters')
    .eq('user_id', userId)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    console.error('No se pudo cargar la información del usuario desde la base de datos:', error);
    return;
  }

  const legacyFavorites = Array.isArray(data?.favorites) ? data.favorites : [];
  const legacyProgress = data?.progress && typeof data.progress === 'object' ? data.progress : {};

  const { data: libraryData, error: libraryError } = await supabaseClient
    .from('user_library_progress')
    .select('favorites, progress')
    .eq('user_id', userId)
    .maybeSingle();

  if (libraryError) {
    console.error('No se pudo cargar la tabla de favoritos y logros:', libraryError);
    state.favorites = [...new Set([...legacyFavorites, ...state.favorites])];
    state.progress = mergeProgress(legacyProgress, state.progress || {});
  } else if (libraryData) {
    state.favorites = [...new Set([...(Array.isArray(libraryData.favorites) ? libraryData.favorites : []), ...state.favorites])];
    state.progress = mergeProgress(libraryData.progress || {}, state.progress || {});
  } else {
    state.favorites = [...new Set([...legacyFavorites, ...state.favorites])];
    state.progress = mergeProgress(legacyProgress, state.progress || {});
    await upsertLibraryProgress();
  }

  if (data) state.purchases = Array.isArray(data.purchases) ? data.purchases : [];

  const customStories = Array.isArray(data?.custom_stories) ? data.custom_stories : [];
  const customCharacters = Array.isArray(data?.custom_characters) ? data.custom_characters : [];

  stories = [...stories.filter((story) => !story.custom), ...customStories];
  characters = [...defaultCharacters, ...customCharacters];
  queueLibraryProgressSave();
  queueUserProfileSave();
}

function getStoryCategories(story) {
  return story.categories || String(story.category || '').split(',').map((category) => category.trim()).filter(Boolean);
}

async function loadRemoteStoryVideos() {
  if (!supabaseClient) return;

  const { data, error } = await supabaseClient
    .from('story_videos')
    .select('story_id, title, src, description, custom');
  if (error) {
    console.warn('No se pudieron cargar los videos:', error);
    return;
  }

  remoteStoryVideos = Object.fromEntries((data || []).map((video) => [video.story_id, video]));
  stories = stories.map((story) => remoteStoryVideos[story.id]
    ? { ...story, video: remoteStoryVideos[story.id] }
    : story);
}

async function loadStoriesFromFiles() {
  let questionSets = [];
  try {
    const questionsResponse = await fetch('assets/Preguntas/Preguntas-y-respuestas-cuentos.md');
    if (questionsResponse.ok) questionSets = parseQuestionsMarkdown(await questionsResponse.text());
  } catch (error) {
    console.warn('No se pudieron cargar las preguntas de los cuentos:', error);
  }

  await loadRemoteStoryVideos();

  const loadedStories = await Promise.all(
    storyFiles.map(async (fileName, storyIndex) => {
      const response = await fetch(`assets/cuentos/${fileName}`);
      if (!response.ok) throw new Error(`No se pudo cargar ${fileName}`);
      const markdown = await response.text();
      const lines = markdown.trim().split('\n');
      const title = lines.shift()?.replace(/^#\s+/, '').replace(/^\d+\.\s*/, '').trim() || fileName.replace('.md', '');
      const paragraphs = lines
        .join('\n')
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
      if (paragraphs.length) {
        const lastParagraph = paragraphs[paragraphs.length - 1];
        if (!/\bFin\.?\s*$/i.test(lastParagraph)) paragraphs[paragraphs.length - 1] = `${lastParagraph}\n\nFin.`;
      } else {
        paragraphs.push('Fin.');
      }
      const firstSentence = (paragraphs[0] || `Conoce la historia de ${title}.`).match(/^.*?[.!?](?:\s|$)/)?.[0].trim()
        || paragraphs[0]
        || `Conoce la historia de ${title}.`;
      const summary = firstSentence.replace(/^Había una vez[,]?\s*/i, '');
      const fallbackSynopsis = summary.length > 150 ? `${summary.slice(0, 147).trim()}...` : summary;

      let synopsis = fallbackSynopsis;
      const descriptionFile = `assets/Descripciones/${fileName.replace('.md', '-descripcion.md')}`;
      try {
        const descriptionResponse = await fetch(descriptionFile);
        if (descriptionResponse.ok) {
          const descriptionMarkdown = await descriptionResponse.text();
          const descriptionLines = descriptionMarkdown
            .trim()
            .split('\n')
            .filter((line) => line.trim() && !line.trim().startsWith('#'));
          const descriptionText = descriptionLines[0]?.trim();
          if (descriptionText) synopsis = descriptionText;
        }
      } catch (error) {
        synopsis = fallbackSynopsis;
      }

      const categories = storyCategoryMap[fileName] || ['Cuentos clásicos'];
      const cover = fallbackStoryCover(title, fileName);

      return {
        id: fileName.replace('.md', ''),
        title,
        category: categories.join(', '),
        categories,
        age: '5-7 años',
        duration: `${Math.max(1, Math.ceil(paragraphs.length * 0.5))} min`,
        difficulty: 'Fácil',
        value: 'Imaginación',
        description: synopsis,
        cover,
        pages: paragraphs.map((text, index) => ({ title: `Página ${index + 1}`, text, image: cover })),
        quiz: questionSets[storyIndex]?.length ? questionSets[storyIndex] : createStoryQuiz(title, paragraphs),
        video: remoteStoryVideos[fileName.replace('.md', '')]
          || storedStoryVideos[fileName.replace('.md', '')]
          || { title, src: '', description: `Video de ${title}.` },
      };
    })
  );

  stories = [...loadedStories].map((story) => ({
    ...story,
    video: remoteStoryVideos[story.id] || story.video,
  }));

  await loadUserProfile();
}

const values = [];

const shopItems = [
  { id: 'forest-theme', name: '🌲 Fondo del bosque mágico', description: 'Un paisaje encantado para tu biblioteca.', price: 80, emoji: '🌲', category: 'Visuales' },
  { id: 'star-theme', name: '✨ Fondo estrellado', description: 'Un cielo lleno de magia para soñar.', price: 90, emoji: '✨', category: 'Visuales' },
  { id: 'garden-theme', name: '🌼 Jardín de hadas', description: 'Un rincón dulce y luminoso para tus cuentos.', price: 100, emoji: '🌼', category: 'Visuales' },
  { id: 'bear-avatar', name: '🐻 Avatar de osito lector', description: 'Un compañero amable para tu perfil.', price: 60, emoji: '🐻', category: 'Personajes' },
  { id: 'fox-avatar', name: '🦊 Avatar de zorro curioso', description: 'Si te gusta explorar historias nuevas.', price: 70, emoji: '🦊', category: 'Personajes' },
  { id: 'star-pack', name: '⭐ Pack de estrellas', description: 'Pegatinas brillantes para tus logros.', price: 40, emoji: '⭐', category: 'Stickers' },
  { id: 'heart-pack', name: '💖 Pack de corazones', description: 'Un toque de cariño y alegría.', price: 45, emoji: '💖', category: 'Stickers' },
  { id: 'story-bonus', name: '📖 Cuento sorpresa extra', description: 'Desbloquea una historia especial.', price: 150, emoji: '📖', category: 'Extras' },
  { id: 'audio-bonus', name: '🎧 Audio especial', description: 'Un audio mágico para escuchar otra vez.', price: 120, emoji: '🎧', category: 'Extras' },
  { id: 'drawing-kit', name: '🎨 Kit de dibujo', description: 'Acceso a un conjunto extra de colores.', price: 90, emoji: '🎨', category: 'Extras' },
];

function getCurrentPoints() {
  const progress = state.progress || {};
  const readStories = Number(progress.readStories || 0);
  const listened = Number(progress.listened || 0);
  const watched = Number(progress.watched || 0);
  const activities = Number(progress.activities || 0);
  const colored = Number(progress.colored || 0);
  return readStories * 25 + listened * 15 + watched * 20 + activities * 30 + colored * 20;
}

const defaultCharacters = [
  { name: 'Caperucita Roja', emoji: '🧺', story: 'Caperucita Roja', description: 'Una niña cariñosa que aprende a cuidar sus pasos y escuchar los consejos de su familia.', value: 'Prudencia', traits: ['Curiosa', 'Cariñosa', 'Valiente'], image: '' },
  { name: 'Cenicienta', emoji: '👠', story: 'Cenicienta', description: 'Una joven bondadosa que conserva la esperanza y encuentra una nueva oportunidad.', value: 'Esperanza', traits: ['Amable', 'Paciente', 'Soñadora'], image: '' },
  { name: 'Blancanieves', emoji: '🍎', story: 'Blancanieves y los siete enanitos', description: 'Una princesa alegre que descubre el valor de la amistad y la confianza.', value: 'Amistad', traits: ['Alegre', 'Generosa', 'Amiga'], image: '' },
  { name: 'Pinocho', emoji: '🤥', story: 'Pinocho', description: 'Un muñeco de madera que aprende que decir la verdad y actuar bien transforma su corazón.', value: 'Honestidad', traits: ['Curioso', 'Sincero', 'Valiente'], image: '' },
  { name: 'Hansel', emoji: '🍬', story: 'Hansel y Gretel', description: 'Un niño ingenioso que protege a su hermana y busca el camino de regreso a casa.', value: 'Ingenio', traits: ['Astuto', 'Protector', 'Valiente'], image: '' },
  { name: 'El Gato con Botas', emoji: '🐱', story: 'El gato con botas', description: 'Un gato inteligente que usa sus ideas para ayudar a su amo a cambiar su destino.', value: 'Ingenio', traits: ['Astuto', 'Leal', 'Decidido'], image: '' },
  { name: 'Ricitos de Oro', emoji: '🐻', story: 'Ricitos de Oro y los tres osos', description: 'Una niña curiosa que aprende a respetar la casa y las cosas de los demás.', value: 'Respeto', traits: ['Curiosa', 'Aventurera', 'Aprendiz'], image: '' },
  { name: 'El Patito Feo', emoji: '🦢', story: 'El patito feo', description: 'Un pequeño que descubre que ser diferente puede esconder una belleza especial.', value: 'Autoestima', traits: ['Sensible', 'Resiliente', 'Único'], image: '' },
  { name: 'La Liebre', emoji: '🐇', story: 'La liebre y la tortuga', description: 'Una corredora veloz que aprende que confiarse demasiado puede hacerle perder una carrera.', value: 'Constancia', traits: ['Rápida', 'Competitiva', 'Aprendiz'], image: '' },
  { name: 'La Tortuga', emoji: '🐢', story: 'La liebre y la tortuga', description: 'Una corredora tranquila que demuestra que avanzar con paciencia ayuda a llegar lejos.', value: 'Perseverancia', traits: ['Paciente', 'Constante', 'Segura'], image: '' },
  { name: 'El León', emoji: '🦁', story: 'El león y el ratón', description: 'Un animal poderoso que descubre que cualquier amigo puede ofrecer una gran ayuda.', value: 'Amistad', traits: ['Fuerte', 'Noble', 'Agradecido'], image: '' },
  { name: 'El Ratón', emoji: '🐭', story: 'El león y el ratón', description: 'Un pequeño ratón que demuestra que el tamaño no impide ser valiente y solidario.', value: 'Solidaridad', traits: ['Valiente', 'Solidario', 'Ingenioso'], image: '' },
  { name: 'La Sirenita', emoji: '🧜‍♀️', story: 'La sirenita', description: 'Una joven del mar que sueña con conocer otros mundos y tomar sus propias decisiones.', value: 'Valentía', traits: ['Soñadora', 'Curiosa', 'Valiente'], image: '' },
  { name: 'Aladino', emoji: '🪔', story: 'Aladino y la lámpara maravillosa', description: 'Un joven aventurero que aprende a usar sus oportunidades con generosidad y responsabilidad.', value: 'Responsabilidad', traits: ['Aventurero', 'Generoso', 'Ingenioso'], image: '' },
  { name: 'Alicia', emoji: '🎩', story: 'Alicia en el país de las maravillas', description: 'Una niña imaginativa que explora un mundo extraño haciendo preguntas y confiando en sí misma.', value: 'Imaginación', traits: ['Curiosa', 'Valiente', 'Imaginativa'], image: '' },
  { name: 'La Abuela', emoji: '👵', story: 'Caperucita Roja', description: 'Una abuela cariñosa que vive cerca del bosque y recibe a Caperucita con amor.', value: 'Familia', traits: ['Cariñosa', 'Sabia', 'Amable'], image: '' },
  { name: 'El Lobo', emoji: '🐺', story: 'Caperucita Roja', description: 'Un personaje astuto que intenta engañar a Caperucita y a su abuela.', value: 'Precaución', traits: ['Astuto', 'Engañoso', 'Rápido'], image: '' },
  { name: 'El Leñador', emoji: '🪓', story: 'Caperucita Roja', description: 'Un hombre atento que escucha el pedido de ayuda y protege a la abuela y a la niña.', value: 'Ayuda', traits: ['Valiente', 'Atento', 'Protector'], image: '' },
  { name: 'La Madrastra', emoji: '🪞', story: 'Cenicienta', description: 'Una mujer severa que trata injustamente a Cenicienta y no reconoce su bondad.', value: 'Elecciones', traits: ['Severa', 'Orgullosa', 'Exigente'], image: '' },
  { name: 'El Hada Madrina', emoji: '🪄', story: 'Cenicienta', description: 'Un hada generosa que ayuda a Cenicienta a cumplir su deseo de ir al baile.', value: 'Generosidad', traits: ['Mágica', 'Generosa', 'Protectora'], image: '' },
  { name: 'El Príncipe', emoji: '🤴', story: 'Cenicienta', description: 'Un joven que busca conocer a la persona que perdió su zapatilla en el baile.', value: 'Amor', traits: ['Amable', 'Decidido', 'Romántico'], image: '' },
  { name: 'La Reina Malvada', emoji: '👑', story: 'Blancanieves y los siete enanitos', description: 'Una reina preocupada por su belleza que deja que los celos guíen sus decisiones.', value: 'Reflexión', traits: ['Vanidosa', 'Celosa', 'Poderosa'], image: '' },
  { name: 'Los Siete Enanitos', emoji: '⛏️', story: 'Blancanieves y los siete enanitos', description: 'Un grupo de amigos trabajadores que ofrece a Blancanieves un hogar y compañía.', value: 'Compañerismo', traits: ['Trabajadores', 'Amigos', 'Protectores'], image: '' },
  { name: 'Geppetto', emoji: '🪵', story: 'Pinocho', description: 'Un carpintero cariñoso que crea a Pinocho y lo guía con paciencia y amor.', value: 'Amor familiar', traits: ['Cariñoso', 'Paciente', 'Trabajador'], image: '' },
  { name: 'El Hada Azul', emoji: '🔵', story: 'Pinocho', description: 'Un hada mágica que acompaña a Pinocho y le enseña el valor de la honestidad.', value: 'Honestidad', traits: ['Sabia', 'Mágica', 'Justa'], image: '' },
  { name: 'Gretel', emoji: '🍞', story: 'Hansel y Gretel', description: 'Una niña valiente que usa su inteligencia para cuidar a su hermano y encontrar la salida.', value: 'Valentía', traits: ['Valiente', 'Astuta', 'Protectora'], image: '' },
  { name: 'La Bruja', emoji: '🧙‍♀️', story: 'Hansel y Gretel', description: 'Una bruja que vive en una casa de dulces y trata de atrapar a los niños.', value: 'Precaución', traits: ['Astuta', 'Misteriosa', 'Peligrosa'], image: '' },
  { name: 'El Molinero', emoji: '🌾', story: 'El gato con botas', description: 'Un hombre que deja a su hijo menor un gato, sin imaginar el talento de su compañero.', value: 'Familia', traits: ['Trabajador', 'Sencillo', 'Padre'], image: '' },
  { name: 'El Marqués de Carabás', emoji: '🎩', story: 'El gato con botas', description: 'El nombre que el gato inventa para ayudar a su joven amo a ganar confianza y respeto.', value: 'Ingenio', traits: ['Astuto', 'Afortunado', 'Decidido'], image: '' },
  { name: 'Papá Oso', emoji: '🐻', story: 'Ricitos de Oro y los tres osos', description: 'Un oso tranquilo que cuida su hogar y enseña la importancia de respetar lo ajeno.', value: 'Respeto', traits: ['Tranquilo', 'Firme', 'Familiar'], image: '' },
  { name: 'Mamá Osa', emoji: '🐻‍❄️', story: 'Ricitos de Oro y los tres osos', description: 'Una osa cariñosa que comparte su hogar con su familia y observa lo que sucede.', value: 'Familia', traits: ['Cariñosa', 'Observadora', 'Protectora'], image: '' },
  { name: 'Osito', emoji: '🧸', story: 'Ricitos de Oro y los tres osos', description: 'El pequeño oso que descubre que alguien entró en su casa y usó sus cosas.', value: 'Curiosidad', traits: ['Pequeño', 'Curioso', 'Sensible'], image: '' },
  { name: 'La Mamá del Patito', emoji: '🦆', story: 'El patito feo', description: 'Una madre que acompaña a sus crías mientras cada una encuentra su propio camino.', value: 'Familia', traits: ['Protectora', 'Paciente', 'Cariñosa'], image: '' },
  { name: 'El Zorro', emoji: '🦊', story: 'La zorra y las uvas', description: 'Un animal que no alcanza las uvas y aprende a reconocer sus propios límites.', value: 'Sinceridad', traits: ['Astuto', 'Persistente', 'Reflexivo'], image: '' },
  { name: 'La Cigarra', emoji: '🦗', story: 'La cigarra y la hormiga', description: 'Una cantante alegre que descubre la importancia de prepararse para el futuro.', value: 'Responsabilidad', traits: ['Alegre', 'Musical', 'Aprendiz'], image: '' },
  { name: 'La Hormiga', emoji: '🐜', story: 'La cigarra y la hormiga', description: 'Una trabajadora previsora que guarda provisiones y enseña con su ejemplo.', value: 'Esfuerzo', traits: ['Trabajadora', 'Previsora', 'Organizada'], image: '' },
  { name: 'El Gigante', emoji: '🧌', story: 'El gigante egoísta', description: 'Un gigante que aprende a abrir su jardín y su corazón para compartir con los niños.', value: 'Generosidad', traits: ['Fuerte', 'Sensible', 'Generoso'], image: '' },
  { name: 'El Genio', emoji: '🧞', story: 'Aladino y la lámpara maravillosa', description: 'Un ser mágico que vive en la lámpara y cumple deseos cuando es liberado.', value: 'Libertad', traits: ['Mágico', 'Poderoso', 'Leal'], image: '' },
  { name: 'El Sombrerero', emoji: '🎩', story: 'Alicia en el país de las maravillas', description: 'Un personaje excéntrico que recibe a Alicia en una merienda llena de acertijos.', value: 'Imaginación', traits: ['Divertido', 'Extraño', 'Creativo'], image: '' },
  { name: 'Peter Pan', emoji: '🧚‍♂️', story: 'Peter Pan', description: 'Un niño que no quiere crecer y guía a sus amigos por las aventuras de Nunca Jamás.', value: 'Aventura', traits: ['Aventurero', 'Valiente', 'Juguetón'], image: '' },
  { name: 'Campanita', emoji: '🧚', story: 'Peter Pan', description: 'Un hada pequeña y brillante que acompaña a Peter Pan y protege a sus amigos.', value: 'Lealtad', traits: ['Mágica', 'Leal', 'Valiente'], image: '' },
];

let characters = [...defaultCharacters];

const coloringScenes = [
  { id: 'bosque-estrellas', title: 'El bosque de las estrellas perdidas', image: 'assets/colorear/El Bosque de las Estrellas Perdidas.avif' },
  { id: 'bella-durmiente-mandala', title: 'La bella durmiente', image: 'assets/colorear/La Bella Durmiente.jpg' },
  { id: 'nube-pintora', title: 'La pequeña nube que quería pintar el mundo', image: 'assets/colorear/La Pequeña Nube que Quería Pintar el Mundo.avif' },
  { id: 'peter-pan-mandala', title: 'Peter Pan', image: 'assets/colorear/Peter Pan.jpg' },
  { id: 'mandala-gato-botas', title: 'El gato con botas', image: 'assets/colorear/El Gato con Botas.jpg' },
  { id: 'mandala-rapunzel', title: 'Rapunzel', image: 'assets/colorear/Rapunzel.jpg' },
  { id: 'pinocho-color', title: 'Pinocho', image: 'assets/colorear/Pinocho.avif' },
  { id: 'ricitos-oro-pintar', title: 'Ricitos de oro y los tres osos', image: 'assets/colorear/Ricitos de Oro y los Tres Osos.jpg' }
];

const mainPaletteColors = [
  '#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF', '#800000', '#B00020', '#FF0000', '#FF5252',
  '#FF8080', '#E91E63', '#FF4081', '#FF80AB', '#F4C2C2', '#6D071A', '#C2185B', '#FF6F61', '#FA8072', '#FFAB91',
  '#7A2E00', '#B87333', '#D2691E', '#FF7500', '#FF9800', '#FFB347', '#FFD0A6', '#806600', '#D4A017', '#FFC107',
  '#FFD600', '#FFFF00', '#FFF176', '#FFF4B0', '#123D20', '#006B2E', '#008844', '#00B84D', '#00E676', '#66BB6A',
  '#9CCC65', '#D4E157', '#568203', '#01796F', '#00A86B', '#046307', '#00FF7F', '#39FF14', '#7FFFD4', '#66CDAA',
  '#00BFA5', '#40E0D0', '#00FFFF', '#80DEEA', '#006D77', '#003C8F', '#0057B8', '#1976D2', '#2196F3', '#64B5F6',
  '#90CAF9', '#001F4D', '#4169E1', '#0047AB', '#120A8F', '#673AB7', '#8E24AA', '#AB47BC', '#CE93D8', '#E1BEE7',
  '#4B0082', '#9966CC', '#5B2C83', '#4E2C1E', '#7B3F00', '#8B4513', '#A67B5B', '#AF6E4D', '#D2A679', '#E8C39E',
  '#FFF1D0', '#4A251A', '#6B3E2E', '#8D5524', '#A97142', '#C68B59', '#D9A066', '#E8AD8A', '#F2C6A0', '#FFE0C2',
  '#65743A', '#4F7942', '#9CAF88', '#98FF98', '#C08081', '#D8A0A6', '#C76B5A', '#B8860B', '#C0C0C0', '#A9B7C6'
];

const skinToneColors = [];
const detailPaletteColors = [];

function hslToHex(hue, saturation, lightness) {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const segment = hue / 60;
  const second = chroma * (1 - Math.abs((segment % 2) - 1));
  const match = lightness - chroma / 2;
  const [red, green, blue] = segment < 1
    ? [chroma, second, 0]
    : segment < 2
      ? [second, chroma, 0]
      : segment < 3
        ? [0, chroma, second]
        : segment < 4
          ? [0, second, chroma]
          : segment < 5
            ? [second, 0, chroma]
            : [chroma, 0, second];
  return `#${[red, green, blue].map((value) => Math.round((value + match) * 255).toString(16).padStart(2, '0')).join('')}`;
}

const paletteColors = [
  '#000000', '#404040', '#808080', '#bfbfbf', '#ffffff',
  ...Array.from({ length: 24 }, (_, hueIndex) => {
    const hue = hueIndex * 15;
    return Array.from({ length: 10 }, (_, lightnessIndex) => {
      const lightness = 0.15 + lightnessIndex * 0.075;
      return hslToHex(hue, 0.85, lightness);
    });
  }).flat()
];

const state = {
  selectedCategory: 'Todos',
  search: '',
  favorites: [],
  progress: {},
  purchases: [],
  currentReader: null,
  currentReaderIndex: 0,
  fontSize: 18,
  audioText: '',
  audioUtterance: null,
  audioPageOffsets: [],
  activeAudioWord: -1,
  audioSession: 0,
  audioHighlightTimer: null,
  audioRate: 0.9,
  currentScene: null,
  activeColor: '#ff5d8f',
  drawing: false,
  eraserMode: false,
  canvasContext: null,
  baseCanvas: null,
  colorCanvas: null,
  baseImageData: null,
  editingStoryId: null,
  editingVideoStoryId: null,
  editingCharacterIndex: null,
  isAdmin: false,
  currentVideoStoryId: null,
  currentVideoSource: null,
};

const localStateKey = 'habia-una-vez-state';
const guestModeKey = 'habia-una-vez-guest-mode';

function loadState() {
  try {
    const storedState = JSON.parse(localStorage.getItem(localStateKey) || '{}');
    state.favorites = Array.isArray(storedState.favorites) ? storedState.favorites : [];
    state.progress = storedState.progress && typeof storedState.progress === 'object' ? storedState.progress : {};
    state.purchases = Array.isArray(storedState.purchases) ? storedState.purchases : [];
  } catch (error) {
    console.warn('No se pudo cargar el progreso local:', error);
  }
}

function isAdmin() {
  return state.isAdmin;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return null;
  return {
    red: parseInt(normalized.slice(0, 2), 16),
    green: parseInt(normalized.slice(2, 4), 16),
    blue: parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHex(red, green, blue) {
  return `#${[red, green, blue].map((value) => Math.max(0, Math.min(255, Number(value) || 0)).toString(16).padStart(2, '0')).join('')}`;
}

function hsvToHex(hue, saturation, value) {
  const chroma = value * saturation;
  const match = chroma * (1 - Math.abs((hue / 60) % 2 - 1));
  const lightness = value - chroma;
  const [red, green, blue] = hue < 60
    ? [chroma, match, 0]
    : hue < 120
      ? [match, chroma, 0]
      : hue < 180
        ? [0, chroma, match]
        : hue < 240
          ? [0, match, chroma]
          : hue < 300
            ? [match, 0, chroma]
            : [chroma, 0, match];
  return rgbToHex((red + lightness) * 255, (green + lightness) * 255, (blue + lightness) * 255);
}

function saveState() {
  try {
    localStorage.setItem(localStateKey, JSON.stringify({
      favorites: state.favorites,
      progress: state.progress,
      purchases: state.purchases,
    }));
  } catch (error) {
    console.warn('No se pudo guardar el progreso local:', error);
  }

  queueLibraryProgressSave();
  queueUserProfileSave();
}

function saveCustomStories() {
  queueUserProfileSave();
}

async function saveStoryVideos() {
  const storyVideos = Object.fromEntries(stories.filter((story) => story.video?.src).map((story) => [story.id, story.video]));
  if (!supabaseClient) return;

  const videos = Object.entries(storyVideos).map(([storyId, video]) => ({
    story_id: storyId,
    title: video.title,
    src: video.src,
    description: video.description,
    custom: Boolean(video.custom),
  }));
  storyVideoSaveQueue = storyVideoSaveQueue
    .catch(() => {})
    .then(async () => {
      const { error } = await supabaseClient.from('story_videos').upsert(videos, { onConflict: 'story_id' });
      if (error) showToast(`No se pudo guardar el video en la base de datos: ${error.message}`);
    });
  return storyVideoSaveQueue;
}

function renderDeleteVideosMenu() {
  const list = document.getElementById('deleteVideosList');
  const videos = stories.filter((story) => story.video?.src);
  list.innerHTML = videos.length
    ? videos.map((story) => `<div class="delete-video-item"><span>🎥 ${story.video.title || story.title}</span><button type="button" class="delete-video-btn" data-action="delete-video" data-id="${story.id}" aria-label="Eliminar video de ${story.title}">🗑️</button></div>`).join('')
    : '<p class="empty-state">No hay videos guardados.</p>';
}

async function deleteVideo(storyId) {
  if (!isAdmin()) return;
  const story = stories.find((item) => item.id === storyId && item.video?.src);
  if (!story || !window.confirm(`¿Eliminar el video de "${story.title}"?`)) return;
  story.video = { title: story.title, src: '', description: `Video de ${story.title}.` };
  delete remoteStoryVideos[storyId];
  if (supabaseClient) {
    storyVideoSaveQueue = storyVideoSaveQueue
      .catch(() => {})
      .then(async () => {
        const { error } = await supabaseClient.from('story_videos').delete().eq('story_id', storyId);
        if (error) showToast(`No se pudo eliminar el video de la base de datos: ${error.message}`);
      });
    await storyVideoSaveQueue;
  }
  saveCustomStories();
  renderVideos();
  renderDeleteVideosMenu();
  showToast('Video eliminado.');
}

function saveCustomCharacters() {
  queueUserProfileSave();
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function resetContentForm(formId, title, submitLabel) {
  const form = document.getElementById(formId);
  form.reset();
  delete form.dataset.editingId;
  delete form.dataset.editingIndex;
  form.querySelector('input[name="cover"]')?.toggleAttribute('required', true);
  form.querySelector('input[name="image"]')?.toggleAttribute('required', true);
  const modal = form.closest('.modal');
  modal.querySelector('h3').textContent = title;
  modal.querySelector('button[type="submit"]').textContent = submitLabel;
}

function openStoryEditor(storyId) {
  const story = stories.find((item) => item.id === storyId && item.custom);
  if (!story) return;
  const form = document.getElementById('addStoryForm');
  form.dataset.editingId = story.id;
  form.querySelector('[name="title"]').value = story.title;
  form.querySelector('[name="description"]').value = story.description;
  form.querySelector('[name="category"]').value = story.category;
  form.querySelector('[name="age"]').value = story.age;
  form.querySelector('[name="pages"]').value = story.pages.map((page) => page.text).join('\n\n');
  form.querySelector('[name="videoUrl"]').value = story.video?.src || '';
  form.querySelector('[name="cover"]').required = false;
  document.getElementById('addStoryTitle').textContent = '✏️ Editar cuento';
  form.querySelector('button[type="submit"]').textContent = '💾 Guardar cambios';
  document.getElementById('addStoryModal').classList.remove('hidden');
}

function openVideoEditor(storyId) {
  if (!isAdmin()) return;
  const story = stories.find((item) => item.id === storyId && item.video?.custom);
  if (!story) return;
  const form = document.getElementById('addVideoForm');
  populateVideoStories();
  form.dataset.editingId = story.id;
  form.querySelector('[name="storyId"]').value = story.id;
  form.querySelector('[name="videoUrl"]').value = story.video.src || '';
  document.getElementById('addVideoTitle').textContent = '✏️ Editar video';
  form.querySelector('button[type="submit"]').textContent = '💾 Guardar cambios';
  document.getElementById('addVideoModal').classList.remove('hidden');
}

function openCharacterEditor(characterIndex) {
  const character = characters[characterIndex];
  if (!character?.custom) return;
  const form = document.getElementById('addCharacterForm');
  form.dataset.editingIndex = characterIndex;
  form.querySelector('[name="name"]').value = character.name;
  form.querySelector('[name="description"]').value = character.description;
  form.querySelector('[name="story"]').value = character.story;
  form.querySelector('[name="value"]').value = character.value;
  form.querySelector('[name="traits"]').value = character.traits.join(', ');
  form.querySelector('[name="image"]').required = false;
  document.getElementById('addCharacterTitle').textContent = '✏️ Editar personaje';
  form.querySelector('button[type="submit"]').textContent = '💾 Guardar cambios';
  document.getElementById('addCharacterModal').classList.remove('hidden');
}

async function addCustomStory(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const title = formData.get('title').trim();
  const description = formData.get('description').trim();
  const videoUrl = formData.get('videoUrl').trim();
  const pageTexts = formData
    .get('pages')
    .trim()
    .split(/\n\s*\n/)
    .map((text) => text.trim())
    .filter(Boolean);
  const coverFile = formData.get('cover');
  const editingStory = stories.find((story) => story.id === form.dataset.editingId && story.custom);

  if (!title || !description || !pageTexts.length || (!editingStory && !coverFile.size)) {
    showToast('Completa el título, la descripción, la portada y el cuento.');
    return;
  }

  if (videoUrl) {
    try {
      const parsedVideoUrl = new URL(videoUrl);
      if (!['http:', 'https:'].includes(parsedVideoUrl.protocol)) throw new Error('URL no válida');
    } catch {
      showToast('Escribe un enlace de video válido.');
      return;
    }
  }

  const cover = coverFile.size ? await readFileAsDataUrl(coverFile) : editingStory.cover;
  const updatedStory = {
    id: editingStory?.id || `custom-${Date.now()}`,
    custom: true,
    title,
    category: formData.get('category'),
    age: formData.get('age'),
    duration: `${Math.max(1, Math.ceil(pageTexts.length * 1.5))} min`,
    difficulty: 'Fácil',
    value: 'Imaginación',
    description,
    cover,
    pages: pageTexts.map((text, index) => ({
      title: `Página ${index + 1}`,
      text,
    })),
    quiz: createStoryQuiz(title, pageTexts),
    video: { title, src: videoUrl, description },
  };

  stories = editingStory
    ? stories.map((story) => (story.id === editingStory.id ? updatedStory : story))
    : [...stories, updatedStory];
  saveCustomStories();
  resetContentForm('addStoryForm', '➕ Añadir un cuento', '💾 Guardar cuento');
  document.getElementById('addStoryModal').classList.add('hidden');
  state.selectedCategory = 'Todos';
  renderFilters();
  renderStories();
  renderAudioGrid();
  renderVideos();
  renderActivities();
  showToast(editingStory ? '¡Cuento actualizado!' : '¡Tu cuento se añadió a la biblioteca!');
}

function populateVideoStories() {
  const storySelect = document.querySelector('#addVideoForm select[name="storyId"]');
  storySelect.innerHTML = stories.map((story) => {
    const alreadyHasVideo = Boolean(story.video?.src);
    const title = alreadyHasVideo ? `${story.title} ✓` : story.title;
    return `<option value="${story.id}" ${alreadyHasVideo ? 'style="color:#0a7f44;"' : ''}>${title}</option>`;
  }).join('');
}

function addVideoToStory(event) {
  event.preventDefault();
  const wasEditing = Boolean(event.currentTarget.dataset.editingId);
  const formData = new FormData(event.currentTarget);
  const videoUrl = formData.get('videoUrl').trim();
  try {
    const parsedVideoUrl = new URL(videoUrl);
    if (!['http:', 'https:'].includes(parsedVideoUrl.protocol)) throw new Error('URL no válida');
  } catch {
    showToast('Escribe un enlace de video válido.');
    return;
  }

  const story = stories.find((item) => item.id === formData.get('storyId'));
  if (!story) return;

  story.video = {
    title: story.title,
    src: videoUrl,
    description: story.description || `Video de ${story.title}.`,
    custom: true,
  };
  saveStoryVideos();
  saveCustomStories();
  resetContentForm('addVideoForm', '🎥 Añadir video', '💾 Guardar video');
  document.getElementById('addVideoModal').classList.add('hidden');
  renderStories();
  renderVideos();
  showToast(wasEditing ? '¡Video actualizado!' : '¡Video añadido al cuento!');
}

async function addCustomCharacter(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const imageFile = formData.get('image');
  const editingIndex = Number.isInteger(Number(form.dataset.editingIndex)) ? Number(form.dataset.editingIndex) : -1;
  const existingCharacter = characters[editingIndex]?.custom ? characters[editingIndex] : null;
  if (!existingCharacter && !imageFile.size) {
    showToast('Selecciona una imagen para el personaje.');
    return;
  }
  const image = imageFile.size ? await readFileAsDataUrl(imageFile) : existingCharacter.image;
  const updatedCharacter = {
    ...(existingCharacter || { custom: true }),
    custom: true,
    name: formData.get('name').trim(),
    description: formData.get('description').trim(),
    story: formData.get('story').trim(),
    value: formData.get('value').trim(),
    traits: formData.get('traits').split(',').map((trait) => trait.trim()).filter(Boolean),
    image,
  };
  characters = existingCharacter
    ? characters.map((character, index) => (index === editingIndex ? updatedCharacter : character))
    : [...characters, updatedCharacter];
  saveCustomCharacters();
  const wasEditing = Boolean(existingCharacter);
  resetContentForm('addCharacterForm', '🧚 Añadir personaje', '💾 Guardar personaje');
  document.getElementById('addCharacterModal').classList.add('hidden');
  renderCharacters();
  showToast(wasEditing ? '¡Personaje actualizado!' : '¡Personaje añadido a la galería!');
}

function getCategoryButtonMarkup() {
  return categoryOrder
    .map((category) => {
      const active = category === state.selectedCategory ? 'is-active' : '';
      return `<button class="filter-btn ${active}" data-category="${category}">${category}</button>`;
    })
    .join('');
}

function renderFilters() {
  document.getElementById('categoryFilters').innerHTML = getCategoryButtonMarkup();
}

function renderStories() {
  const storyGrid = document.getElementById('storyGrid');
  const filteredStories = stories.filter((story) => {
    const categories = getStoryCategories(story);
    const matchesCategory = state.selectedCategory === 'Todos' || categories.includes(state.selectedCategory);
    const searchable = `${story.title} ${categories.join(' ')} ${story.value} ${story.description}`.toLowerCase();
    const matchesSearch = searchable.includes(state.search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  storyGrid.innerHTML = filteredStories.length
    ? filteredStories
        .map(
          (story) => `
            <article class="story-card">
              <div class="story-cover">
                <img class="story-cover-image" src="${story.cover}" alt="${story.title}" />
              </div>
              <div class="story-body">
                <div class="story-topline">
                  <h3 class="story-title">${story.title}</h3>
                  <button class="story-fav ${state.favorites.includes(story.id) ? 'is-active' : ''}" data-action="toggle-favorite" data-id="${story.id}" aria-label="Guardar en favoritos">⭐</button>
                </div>

                <p class="story-description">${story.description}</p>

                <div class="meta-row">
                  <span class="story-meta">🧒 ${story.age}</span>
                  <span class="story-meta">🏷️ ${getStoryCategories(story).join(' · ')}</span>
                </div>

                <div class="story-actions">
                  <button class="card-action" data-action="read" data-id="${story.id}">📖 Leer</button>
                </div>
              </div>
            </article>
          `
        )
        .join('')
    : '<div class="empty-state">No encontramos cuentos con ese filtro. Intenta otra búsqueda.</div>';
}

function renderAudioGrid() {
  const audioGrid = document.getElementById('audioGrid');
  audioGrid.innerHTML = stories
    .map(
      (story) => `
        <article class="audio-tile">
          <div class="audio-cover">
            <img class="audio-cover-image" src="${story.cover}" alt="Imagen de ${story.title}" />
          </div>
          <h3>${story.title}</h3>
          <div class="badge-row">
            <span class="mini-badge">🎧 ${story.duration}</span>
            <span class="mini-badge">🧒 ${story.age}</span>
          </div>
          <div class="audio-controls">
            <button data-action="listen" data-id="${story.id}">▶️ Reproducir</button>
          </div>
        </article>
      `
    )
    .join('');
}

function renderVideos() {
  const videoGrid = document.getElementById('videoGrid');
  const videos = stories.filter((story) => story.video?.src);
  videoGrid.innerHTML = videos.length
    ? videos
    .map(
      (story) => `
        <article class="video-card">
          <div class="video-thumb" style="background-image:url('${story.cover}')"></div>
          <h3>${story.title}</h3>
          <p>${story.video.description}</p>
          <div class="video-meta">
            <span class="mini-badge">🏷️ ${getStoryCategories(story).join(' · ')}</span>
            <span class="mini-badge">🧒 ${story.age}</span>
          </div>
          <div class="video-buttons">
            <button class="video-btn" data-action="watch" data-id="${story.id}">▶️ Ver cuento</button>
            ${story.video.custom && isAdmin() ? `<button class="video-btn edit-action" data-action="edit-video" data-id="${story.id}">✏️ Editar</button>` : ''}
            ${isAdmin() ? `<button class="video-btn delete-action" data-action="delete-video" data-id="${story.id}">🗑️ Eliminar</button>` : ''}
          </div>
        </article>
      `
    )
    .join('')
    : '<div class="empty-state">Todavía no hay videos añadidos.</div>';
}

function renderActivities() {
  const activityGrid = document.getElementById('activityGrid');
  activityGrid.innerHTML = stories
    .map(
      (story) => `
        <article class="activity-card-item">
          <h3>${story.title}</h3>
          <div class="badge-row">
            <span class="mini-badge">🧠 Comprensión</span>
            <span class="mini-badge">${getStoryCategories(story).join(' · ')}</span>
          </div>
          <div class="activity-buttons">
            <button class="card-action" data-action="activity" data-id="${story.id}">🎮 Jugar</button>
          </div>
        </article>
      `
    )
    .join('');
}

function renderColoring() {
  const coloringGrid = document.getElementById('coloringGrid');
  const validScenes = coloringScenes.filter((scene) => scene.image && scene.image.trim());

  if (!validScenes.length) {
    coloringGrid.innerHTML = '<div class="empty-state">No hay imágenes de colorear disponibles por el momento.</div>';
    return;
  }

  coloringGrid.innerHTML = validScenes
    .map(
      (scene) => `
        <article class="coloring-card">
          <img alt="${scene.title}" src="${scene.image}" />
          <h3>${scene.title}</h3>
          <div class="coloring-actions">
            <button class="card-action" data-action="open-color" data-scene="${scene.id}">🎨 Colorear</button>
            <button class="card-action" data-action="print-color" data-scene="${scene.id}">🖨️ Imprimir</button>
            <button class="card-action" data-action="save-color" data-scene="${scene.id}">💾 Guardar</button>
          </div>
        </article>
      `
    )
    .join('');
}

function renderCharacters() {
  const charactersGrid = document.getElementById('charactersGrid');
  charactersGrid.innerHTML = characters
    .map(
      (character) => `
        <article class="character-card">
          <div class="character-avatar ${character.image ? '' : 'character-avatar-placeholder'}" style="${character.image ? `background-image:url('${character.image}')` : ''}">${character.image ? '' : (character.emoji || '✨')}</div>
          <div>
            <h3>${character.name}</h3>
            <p>${character.description}</p>
            <div class="character-features">
              <span>📚 ${character.story}</span>
              <span>✨ ${character.value}</span>
            </div>
            <div class="character-features" style="margin-top:10px;">
              ${character.traits.map((trait) => `<span>${trait}</span>`).join('')}
            </div>
            ${character.custom && isAdmin() ? `<button class="card-action edit-action" data-action="edit-character" data-character-index="${characters.indexOf(character)}">✏️ Editar</button>` : ''}
          </div>
        </article>
      `
    )
    .join('');
}

function renderValues() {
  const valuesGrid = document.getElementById('valuesGrid');
  valuesGrid.innerHTML = values
    .map(
      (item) => `
        <article class="value-card">
          <div class="emoji">${item.emoji}</div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <div class="value-list">
            <span class="mini-badge">📚 ${item.story}</span>
          </div>
        </article>
      `
    )
    .join('');
}

function renderFavorites() {
  const favoritesGrid = document.getElementById('favoritesGrid');
  const favorites = stories.filter((story) => state.favorites.includes(story.id));

  if (!favorites.length) {
    favoritesGrid.innerHTML = '<div class="empty-state">Todavía no has guardado cuentos favoritos. Usa la estrella en cada tarjeta.</div>';
    return;
  }

  favoritesGrid.innerHTML = favorites
    .map(
      (story) => `
        <article class="story-card">
          <div class="story-cover" style="background-image:url('${story.cover}')"></div>
          <div class="story-body">
            <div class="story-topline">
              <h3 class="story-title">${story.title}</h3>
              <button class="story-fav is-active" data-action="toggle-favorite" data-id="${story.id}" aria-label="Quitar de favoritos">⭐</button>
            </div>
            <div class="story-actions">
              <button class="card-action" data-action="read" data-id="${story.id}">📖 Leer</button>
              <button class="card-action" data-action="listen" data-id="${story.id}">🎧 Escuchar</button>
              <button class="card-action" data-action="watch" data-id="${story.id}">🎥 Ver</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');
}

function renderShop() {
  const shopGrid = document.getElementById('shopGrid');
  const shopSummary = document.getElementById('shopSummary');
  const points = getCurrentPoints();

  shopSummary.innerHTML = `
    <span>🏆 Tus puntos: ${points}</span>
    <span>🛍️ Inventario: ${state.purchases.length} artículos</span>
  `;

  shopGrid.innerHTML = shopItems.map((item) => {
    const owned = state.purchases.includes(item.id);
    const affordable = points >= item.price;
    return `
      <article class="shop-card">
        <div class="shop-icon">${item.emoji}</div>
        <div>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </div>
        <div class="shop-meta">
          <span class="shop-price">⭐ ${item.price}</span>
          <button type="button" class="${owned ? 'is-owned' : ''}" data-action="buy-item" data-id="${item.id}" ${owned || !affordable ? 'disabled' : ''}>
            ${owned ? 'Comprado' : 'Comprar'}
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function renderAchievements() {
  const achievementsGrid = document.getElementById('achievementsGrid');
  const progress = state.progress;
  const readStoryIds = progress.readStoryIds || [];
  const readStories = readStoryIds.length || progress.readStories || 0;
  const listened = progress.listened || 0;
  const watched = progress.watched || 0;
  const activities = progress.activities || 0;
  const colored = progress.colored || 0;
  const points = readStories * 25 + listened * 15 + watched * 20 + activities * 30 + colored * 20;
  const completedActivityIds = progress.completedActivityIds || [];

  const existingBadges = [
    { key: 'readStories', title: '🏅 Mi primer cuento', unlocked: readStories >= 1 },
    { key: 'readStories', title: '📚 Gran lector', unlocked: readStories >= 3 },
    { key: 'listened', title: '🎧 Amante de las historias', unlocked: listened >= 2 },
    { key: 'colored', title: '🎨 Gran artista', unlocked: colored >= 1 },
    { key: 'activities', title: '🧠 Experto en actividades', unlocked: activities >= 2 },
    { key: 'points', title: '✨ Maestro de la imaginación', unlocked: points >= 120 }
  ];
  const storyBadges = stories.map((story) => ({
    key: `story-${story.id}`,
    title: `📖 ${story.title}`,
    unlocked: readStoryIds.includes(story.id),
  }));
  const activityBadges = stories.map((story) => ({
    key: `activity-${story.id}`,
    title: `🎮 Actividad: ${story.title}`,
    unlocked: completedActivityIds.includes(story.id),
  }));
  const extraBadges = [
    { key: 'extra-1', title: '🌱 Primer paso', unlocked: readStories >= 1 },
    { key: 'extra-2', title: '📚 Dos historias', unlocked: readStories >= 2 },
    { key: 'extra-3', title: '📚 Cinco historias', unlocked: readStories >= 5 },
    { key: 'extra-4', title: '📚 Diez historias', unlocked: readStories >= 10 },
    { key: 'extra-5', title: '📚 Quince historias', unlocked: readStories >= 15 },
    { key: 'extra-6', title: '🏆 Biblioteca completa', unlocked: readStories >= 30 },
    { key: 'extra-7', title: '🎧 Primer audio', unlocked: listened >= 1 },
    { key: 'extra-8', title: '🎧 Tres audios', unlocked: listened >= 3 },
    { key: 'extra-9', title: '🎧 Diez audios', unlocked: listened >= 10 },
    { key: 'extra-10', title: '🎧 Gran oyente', unlocked: listened >= 30 },
    { key: 'extra-11', title: '🎮 Primer juego', unlocked: activities >= 1 },
    { key: 'extra-12', title: '🎮 Tres juegos', unlocked: activities >= 3 },
    { key: 'extra-13', title: '🎮 Diez juegos', unlocked: activities >= 10 },
    { key: 'extra-14', title: '🧠 Mente curiosa', unlocked: activities >= 20 },
    { key: 'extra-15', title: '🎨 Primer dibujo', unlocked: colored >= 1 },
    { key: 'extra-16', title: '🎨 Tres dibujos', unlocked: colored >= 3 },
    { key: 'extra-17', title: '🎨 Diez dibujos', unlocked: colored >= 10 },
    { key: 'extra-18', title: '🌈 Artista constante', unlocked: colored >= 20 },
    { key: 'extra-19', title: '⭐ Diez favoritos', unlocked: state.favorites.length >= 10 },
    { key: 'extra-20', title: '⭐ Coleccionista', unlocked: state.favorites.length >= 20 },
    { key: 'extra-21', title: '✨ Cien puntos', unlocked: points >= 100 },
    { key: 'extra-22', title: '✨ Quinientos puntos', unlocked: points >= 500 },
    { key: 'extra-23', title: '🌟 Mil puntos', unlocked: points >= 1000 },
    { key: 'extra-24', title: '👑 Maestro de cuentos', unlocked: readStories >= 30 && listened >= 30 && activities >= 20 && colored >= 20 },
  ];
  const badges = [...existingBadges, ...storyBadges, ...activityBadges, ...extraBadges];

  achievementsGrid.innerHTML = badges
    .map(
      (badge) => `
        <article class="achievement-card ${badge.unlocked ? 'unlocked' : 'locked'}">
          <h3>${badge.title}</h3>
          <p>${badge.unlocked ? '¡Logro desbloqueado!' : 'Sigue avanzando para conseguirlo.'}</p>
          <div class="badge-row">
            <span class="mini-badge">${badge.unlocked ? '✅' : '⏳'} ${badge.unlocked ? 'Completado' : 'Pendiente'}</span>
          </div>
        </article>
      `
    )
    .join('');

  const summary = document.createElement('div');
  summary.className = 'achievement-summary';
  summary.innerHTML = `
    <div class="story-meta">📚 Cuentos leídos: ${readStories}</div>
    <div class="story-meta">🎧 Audios: ${listened}</div>
    <div class="story-meta">🎥 Videos: ${watched}</div>
    <div class="story-meta">🎮 Actividades: ${activities}</div>
    <div class="story-meta">🎨 Dibujos: ${colored}</div>
    <div class="story-meta">⭐ Puntos: ${points}</div>
  `;

  const existing = achievementsGrid.querySelector('.achievement-summary');
  if (existing) existing.remove();
  achievementsGrid.appendChild(summary);
}

function generateColoringSvg(type, title) {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 220'>
      <rect width='300' height='220' fill='#fdfbff'/>
      <g stroke='#1f1b2d' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'>
      ${
        type === 'castle'
          ? `
            <rect x='70' y='80' width='160' height='100' rx='12' />
            <path d='M90 80 L120 40 L150 80 M150 80 L180 40 L210 80' fill='none'/>
            <rect x='95' y='120' width='18' height='28' />
            <rect x='132' y='110' width='20' height='38' />
            <rect x='170' y='118' width='18' height='30' />
            <path d='M70 180 L250 180' />
            <circle cx='60' cy='50' r='18' fill='none' />
            <path d='M40 140 C80 120, 100 100, 120 140' />
          `
          : type === 'forest'
          ? `
            <path d='M60 170 L90 90 L120 170 Z' />
            <path d='M120 170 L150 75 L180 170 Z' />
            <path d='M170 170 L200 80 L230 170 Z' />
            <rect x='84' y='170' width='12' height='30' />
            <rect x='144' y='170' width='12' height='32' />
            <rect x='194' y='170' width='12' height='28' />
            <circle cx='210' cy='50' r='22' fill='none' />
            <path d='M20 160 C60 120, 120 130, 170 160' />
          `
          : type === 'rabbit'
          ? `
            <circle cx='150' cy='110' r='55' />
            <ellipse cx='112' cy='44' rx='16' ry='28' />
            <ellipse cx='188' cy='44' rx='16' ry='28' />
            <circle cx='127' cy='90' r='5' />
            <circle cx='173' cy='90' r='5' />
            <path d='M122 128 Q150 150 178 128' />
            <path d='M65 150 C95 120, 110 134, 120 150' />
            <path d='M235 150 C205 120, 190 136, 180 150' />
            <circle cx='90' cy='150' r='12' />
            <circle cx='210' cy='150' r='12' />
          `
          : `
            <path d='M150 40 L180 88 L120 88 Z' />
            <ellipse cx='150' cy='120' rx='62' ry='52' />
            <path d='M75 120 C100 90, 120 90, 140 120' />
            <path d='M160 120 C180 90, 200 90, 225 120' />
            <path d='M110 150 C120 170, 140 175, 150 170 C160 175, 180 170, 190 150' />
            <circle cx='130' cy='102' r='4' />
            <circle cx='170' cy='102' r='4' />
          `
      }
      </g>
      <text x='150' y='210' text-anchor='middle' font-size='16' fill='#2c2859' font-family='Segoe UI, sans-serif'>${title}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function completeStoryRead(storyId) {
  const progress = state.progress;
  progress.readStoryIds = progress.readStoryIds || [];
  if (!progress.readStoryIds.includes(storyId)) {
    progress.readStoryIds.push(storyId);
    progress.readStories = progress.readStoryIds.length;
    state.progress = progress;
    saveState();
    renderAchievements();
    showToast('¡Historia completada! Has ganado puntos por leerla entera.');
  }
}

function openReader(storyId) {
  const story = stories.find((item) => item.id === storyId);
  if (!story) return;

  state.currentReader = story;
  state.currentReaderIndex = 0;
  state.fontSize = 18;
  updateReaderDisplay();
  document.getElementById('readerModal').classList.remove('hidden');
  document.getElementById('readerCategory').textContent = story.category;
  document.getElementById('readerTitle').textContent = story.title;
  document.getElementById('readerCover').style.backgroundImage = `url('${story.cover}')`;
}

function updateReaderDisplay() {
  const story = state.currentReader;
  if (!story) return;

  const page = story.pages[state.currentReaderIndex];
  const pageText = page ? page.text : '';
  const progress = ((state.currentReaderIndex + 1) / story.pages.length) * 100;

  let wordIndex = 0;
  const words = pageText.split(/(\s+)/).map((part) => {
    if (!part.trim()) return part;
    const markup = `<span class="reader-word ${wordIndex === state.activeAudioWord ? 'is-speaking' : ''}" data-word-index="${wordIndex}">${part}</span>`;
    wordIndex += 1;
    return markup;
  }).join('');

  document.getElementById('readerPage').innerHTML = `
    <p><strong>${page.title}</strong></p>
    <p style="font-size:${state.fontSize}px;">${words}</p>
  `;

  document.getElementById('readerProgressBar').style.width = `${progress}%`;
  document.getElementById('readerProgressText').textContent = `Página ${state.currentReaderIndex + 1} de ${story.pages.length}`;

  const prevBtn = document.getElementById('prevPageBtn');
  const nextBtn = document.getElementById('nextPageBtn');
  prevBtn.disabled = state.currentReaderIndex === 0;
  nextBtn.textContent = state.currentReaderIndex === story.pages.length - 1 ? 'Final ➡️' : 'Siguiente ➡️';
}

function updateReaderHighlight() {
  document.querySelectorAll('#readerPage .reader-word').forEach((word) => {
    word.classList.toggle('is-speaking', Number(word.dataset.wordIndex) === state.activeAudioWord);
  });
}

function openAudio(storyId) {
  const story = stories.find((item) => item.id === storyId);
  if (!story) return;

  state.audioText = story.pages.map((page) => page.text).join(' ');
  document.getElementById('audioTitle').textContent = `🎧 ${story.title}`;
  const audioCover = document.getElementById('audioCover');
  audioCover.style.backgroundImage = `url('${story.cover}')`;
  audioCover.setAttribute('aria-label', `Imagen de ${story.title}`);
  document.getElementById('audioModal').classList.remove('hidden');
  document.getElementById('audioStatus').textContent = 'Listo para escuchar.';
  document.getElementById('audioRate').value = String(state.audioRate);
  document.getElementById('audioRateValue').textContent = `${state.audioRate.toFixed(1)}x`;

  const progress = state.progress;
  progress.listened = (progress.listened || 0) + 1;
  state.progress = progress;
  saveState();
  renderAchievements();
}

function chooseKidFriendlyVoice() {
  if (!('speechSynthesis' in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const spanishVoices = voices.filter((voice) => {
    const lang = (voice.lang || '').toLowerCase();
    return lang.startsWith('es');
  });

  if (!spanishVoices.length) return null;

  const preferred = spanishVoices.find((voice) => voice.lang.toLowerCase() === 'es-es')
    || spanishVoices.find((voice) => voice.lang.toLowerCase().startsWith('es-'))
    || spanishVoices[0];

  return preferred;
}

function clearAudioHighlightTimer() {
  if (state.audioHighlightTimer) {
    window.clearInterval(state.audioHighlightTimer);
    state.audioHighlightTimer = null;
  }
}

function speakReaderPage(pageIndex, sessionId) {
  const story = state.currentReader;
  if (!story || sessionId !== state.audioSession) return;

  if (pageIndex >= story.pages.length) {
    state.audioUtterance = null;
    state.activeAudioWord = -1;
    state.audioPageOffsets = [];
    document.getElementById('audioStatus').textContent = 'Audio finalizado.';
    updateReaderDisplay();
    return;
  }

  const pageText = story.pages[pageIndex].text;
  const words = pageText.trim().split(/\s+/).filter(Boolean);
  state.currentReaderIndex = pageIndex;
  state.activeAudioWord = 0;
  updateReaderDisplay();

  const utterance = new SpeechSynthesisUtterance(pageText);
  const kidVoice = chooseKidFriendlyVoice();
  if (kidVoice) {
    utterance.voice = kidVoice;
    utterance.lang = kidVoice.lang || 'es-ES';
  }
  utterance.rate = state.audioRate;
  utterance.pitch = 1.2;
  utterance.volume = Number(document.getElementById('audioVolume').value);

  let fallbackWord = 0;
  let lastBoundaryAt = 0;
  const wordDelay = Math.max(180, 60000 / Math.max(60, state.audioRate * 150));
  state.audioHighlightTimer = window.setInterval(() => {
    if (sessionId !== state.audioSession || (lastBoundaryAt && Date.now() - lastBoundaryAt < wordDelay * 1.35)) return;
    fallbackWord = Math.min(fallbackWord + 1, Math.max(0, words.length - 1));
    if (state.activeAudioWord !== fallbackWord) {
      state.activeAudioWord = fallbackWord;
      updateReaderHighlight();
    }
  }, wordDelay);

  utterance.onstart = () => {
    document.getElementById('audioStatus').textContent = `Leyendo página ${pageIndex + 1}...`;
  };
  utterance.onboundary = (event) => {
    if (sessionId !== state.audioSession || typeof event.charIndex !== 'number') return;
    const activeWord = pageText.slice(0, event.charIndex).trim().split(/\s+/).filter(Boolean).length;
    fallbackWord = Math.min(activeWord, Math.max(0, words.length - 1));
    lastBoundaryAt = Date.now();
    if (state.activeAudioWord !== fallbackWord) {
      state.activeAudioWord = fallbackWord;
      updateReaderHighlight();
    }
  };
  utterance.onend = () => {
    clearAudioHighlightTimer();
    if (sessionId === state.audioSession) speakReaderPage(pageIndex + 1, sessionId);
  };
  utterance.onerror = () => {
    clearAudioHighlightTimer();
    if (sessionId === state.audioSession) {
      state.audioUtterance = null;
      document.getElementById('audioStatus').textContent = 'No se pudo reproducir el audio.';
    }
  };

  state.audioUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

function speakText() {
  if (!('speechSynthesis' in window)) {
    showToast('Tu navegador no soporta audio narrado.');
    return;
  }

  if (state.currentReader && state.audioPageOffsets.length) {
    state.audioSession += 1;
    clearAudioHighlightTimer();
    window.speechSynthesis.cancel();
    speakReaderPage(0, state.audioSession);
    return;
  }

  const kidVoice = chooseKidFriendlyVoice();
  const utterance = new SpeechSynthesisUtterance(state.audioText);
  if (kidVoice) {
    utterance.voice = kidVoice;
    utterance.lang = kidVoice.lang || 'es-ES';
  }
  utterance.rate = state.audioRate;
  utterance.pitch = 1.2;
  utterance.volume = Number(document.getElementById('audioVolume').value);
  utterance.onstart = () => {
    document.getElementById('audioStatus').textContent = 'Reproduciendo audio...';
  };
  utterance.onend = () => {
    document.getElementById('audioStatus').textContent = 'Audio finalizado.';
    state.activeAudioWord = -1;
    state.audioPageOffsets = [];
    if (state.currentReader) updateReaderDisplay();
  };

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  state.audioUtterance = utterance;
}

function stopAudioPlayback() {
  if (!('speechSynthesis' in window)) return;

  state.audioSession += 1;
  clearAudioHighlightTimer();
  window.speechSynthesis.cancel();
  state.audioUtterance = null;
  state.activeAudioWord = -1;
  state.audioPageOffsets = [];
  if (document.getElementById('audioStatus')) {
    document.getElementById('audioStatus').textContent = 'Audio detenido.';
  }
}

function stopVideoPlayback() {
  const video = document.getElementById('storyVideo');
  const videoFrame = document.getElementById('storyVideoFrame');

  if (video) {
    try {
      video.pause();
    } catch (error) {
      // El elemento puede estar ya desmontado o con fuente no válida.
    }
    try {
      video.currentTime = 0;
    } catch (error) {
      // El navegador puede ya no tener una fuente válida.
    }
    video.muted = false;
    video.volume = 1;
    video.innerHTML = '';
    video.removeAttribute('src');
    try {
      video.load();
    } catch (error) {
      // No bloquea el cierre del modal si el navegador ya liberó el video.
    }
  }

  if (videoFrame) {
    videoFrame.src = '';
    videoFrame.classList.add('hidden');
  }

  if (video && !video.classList.contains('hidden')) {
    video.classList.add('hidden');
  }
  state.currentVideoStoryId = null;
  state.currentVideoSource = null;
}

function pauseAudio() {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.pause();
  document.getElementById('audioStatus').textContent = 'Audio pausado.';
}

function restartAudio() {
  if (!state.audioText) return;
  window.speechSynthesis.cancel();
  speakText();
}

function guessVideoMimeType(src) {
  const extension = src.toLowerCase().split('?')[0].split('.').pop();
  if (!extension) return 'video/mp4';
  return {
    'mp4': 'video/mp4',
    'm4v': 'video/mp4',
    'mov': 'video/quicktime',
    'webm': 'video/webm',
    'ogg': 'video/ogg',
    'ogv': 'video/ogg',
    'm3u8': 'application/vnd.apple.mpegurl',
  }[extension] || 'video/mp4';
}

function getVideoSourceFromUrl(src) {
  try {
    const parsed = new URL(src);
    const hostname = parsed.hostname.toLowerCase();

    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      const youtubeId = hostname.includes('youtu.be')
        ? parsed.pathname.replace('/', '')
        : parsed.searchParams.get('v') || parsed.pathname.split('/').filter(Boolean).pop();
      if (!youtubeId) return { kind: 'unsupported', src, error: 'No se pudo extraer el video de YouTube.' };
      return { kind: 'youtube', src: `https://www.youtube.com/embed/${youtubeId}`, mime: '' };
    }

    if (hostname.includes('vimeo.com')) {
      const vimeoId = parsed.pathname.split('/').filter(Boolean).pop();
      if (!vimeoId) return { kind: 'unsupported', src, error: 'No se pudo extraer el video de Vimeo.' };
      return { kind: 'vimeo', src: `https://player.vimeo.com/video/${vimeoId}`, mime: '' };
    }

    return { kind: 'direct', src, mime: guessVideoMimeType(src) };
  } catch (error) {
    return { kind: 'unsupported', src, error: 'La URL del video no es válida.' };
  }
}

function postEmbeddedVideoCommand(command, value) {
  const videoFrame = document.getElementById('storyVideoFrame');
  if (!videoFrame?.contentWindow || !state.currentVideoSource) return false;

  if (state.currentVideoSource.kind === 'youtube') {
    const youtubeCommand = command === 'play' ? 'playVideo'
      : command === 'pause' ? 'pauseVideo'
        : command;
    videoFrame.contentWindow.postMessage(JSON.stringify({
      event: 'command',
      func: youtubeCommand,
      args: value === undefined ? [] : [value],
    }), 'https://www.youtube.com');
    return true;
  }

  if (state.currentVideoSource.kind === 'vimeo') {
    videoFrame.contentWindow.postMessage({ method: command, value }, 'https://player.vimeo.com');
    return true;
  }

  return false;
}

function getActiveVideoElement() {
  const video = document.getElementById('storyVideo');
  return video && !video.classList.contains('hidden') ? video : null;
}

function openVideo(storyId) {
  const story = stories.find((item) => item.id === storyId);
  if (!story || !story.video.src) {
    showToast('Este cuento no tiene un video agregado.');
    return;
  }

  const video = document.getElementById('storyVideo');
  const videoFrame = document.getElementById('storyVideoFrame');
  const videoSource = getVideoSourceFromUrl(story.video.src);

  if (videoSource.kind === 'unsupported') {
    showToast(videoSource.error || 'Este enlace de video no es compatible.');
    return;
  }

  if (videoSource.kind === 'youtube' || videoSource.kind === 'vimeo') {
    video.pause();
    video.innerHTML = '';
    video.classList.add('hidden');
    videoFrame.classList.remove('hidden');
    const separator = videoSource.src.includes('?') ? '&' : '?';
    videoFrame.src = `${videoSource.src}${separator}${videoSource.kind === 'youtube' ? 'enablejsapi=1' : 'api=1'}`;
    videoFrame.setAttribute('allowfullscreen', 'true');
  } else {
    videoFrame.classList.add('hidden');
    videoFrame.removeAttribute('src');
    video.classList.remove('hidden');

    const source = document.createElement('source');
    source.src = videoSource.src;
    source.type = videoSource.mime;
    video.innerHTML = '';
    video.appendChild(source);
    video.volume = 1;
    video.muted = false;
    try {
      video.load();
    } catch (error) {
      showToast('No se pudo cargar el video. Prueba con otro enlace directo.');
      return;
    }
  }

  state.currentVideoStoryId = storyId;
  state.currentVideoSource = videoSource;

  document.getElementById('videoTitle').textContent = story.title;
  document.getElementById('videoModal').classList.remove('hidden');

  const progress = state.progress;
  progress.watched = (progress.watched || 0) + 1;
  state.progress = progress;
  saveState();
  renderAchievements();
}

function openActivity(storyId) {
  const story = stories.find((item) => item.id === storyId);
  if (!story) return;

  document.getElementById('activityTitle').textContent = `🎮 ${story.title}`;
  state.activityStoryId = storyId;
  document.getElementById('activityChoices').classList.remove('hidden');
  document.getElementById('activityGame').innerHTML = '<p class="activity-prompt">Elige un juego para comenzar.</p>';
  document.getElementById('activityResult').textContent = '';
  document.getElementById('completeActivityBtn').classList.add('hidden');
  document.getElementById('activityModal').classList.remove('hidden');
}

function completeActivity(storyId) {
  const progress = state.progress;
  progress.activities = (progress.activities || 0) + 1;
  progress.completedActivityIds = progress.completedActivityIds || [];
  if (!progress.completedActivityIds.includes(storyId)) {
    progress.completedActivityIds.push(storyId);
  }
  state.progress = progress;
  saveState();
  renderAchievements();
  document.getElementById('activityResult').textContent = '¡Felicitaciones! Completaste la actividad. 🌟';
  document.getElementById('completeActivityBtn').classList.add('hidden');
}

function renderWordSearch(story) {
  const text = `${story.title} ${story.pages.map((page) => page.text).join(' ')}`;
  const words = [...new Set((text.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{4,}/g) || [])
    .map((word) => word.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase())
    .filter((word) => word.length <= 12))].slice(0, 10);
  const targets = words.length >= 3 ? words : ['CUENTO', 'AMIGO', 'FAMILIA', 'BOSQUE', 'JUEGO'];
  const columns = 14;
  const rows = 14;
  const wordColors = ['#15803d', '#c2410c', '#6d28d9', '#be123c', '#0e7490', '#a16207', '#4338ca', '#047857', '#b91c1c', '#4d7c0f'];
  const alphabet = 'AEIOULMNPRST';
  const letters = Array.from({ length: rows * columns }, (_, index) => alphabet[index % alphabet.length]);
  const paths = targets.map((word, index) => {
    const path = [];
    if (index < 2) {
      const row = index;
      const reversed = index === 1;
      for (let offset = 0; offset < word.length; offset += 1) {
        const column = reversed ? word.length - 1 - offset : offset;
        path.push(row * columns + column);
      }
    } else {
      const column = index - 2;
      const reversed = index % 2 === 1;
      const startRow = reversed ? rows - word.length : 2;
      for (let offset = 0; offset < word.length; offset += 1) {
        const row = reversed ? startRow + word.length - 1 - offset : startRow + offset;
        path.push(row * columns + column);
      }
    }
    word.split('').forEach((letter, offset) => { letters[path[offset]] = letter; });
    return path;
  });
  const targetByCell = new Map();
  paths.forEach((path, targetIndex) => path.forEach((cellIndex) => targetByCell.set(cellIndex, targetIndex)));
  state.activityGame = { type: 'word-search', storyId: story.id, targets, targetIndex: 0, selected: [], foundTargets: [], paths };
  document.getElementById('activityGame').innerHTML = `
    <p class="activity-prompt">Encuentra estas palabras:</p>
    <div class="word-list">${targets.map((word, index) => `<button type="button" class="word-target ${index === 0 ? 'is-current' : ''}" data-target-index="${index}" style="--word-color:${wordColors[index % wordColors.length]}">${word}</button>`).join('')}</div>
    <div class="word-search-grid">${letters.map((letter, index) => {
      const targetIndex = targetByCell.get(index);
      const colorStyle = targetIndex === undefined ? '' : `style="--word-color:${wordColors[targetIndex % wordColors.length]}" data-word-target="${targetIndex}"`;
      return `<button type="button" class="word-cell" data-word-index="${index}" ${colorStyle}>${letter}</button>`;
    }).join('')}</div>
  `;
}

function renderQuizQuestion(story) {
  const game = state.activityGame;
  const quizQuestion = game.questions[game.currentIndex];
  if (!quizQuestion) return;

  document.getElementById('activityGame').innerHTML = `
    <p class="activity-prompt">Pregunta ${game.currentIndex + 1} de ${game.questions.length}</p>
    <div class="question-box">
      <h4>${quizQuestion.question}</h4>
      <div class="quiz-options">
        ${quizQuestion.options.map((option, optionIndex) => `<button type="button" data-quiz-option="${optionIndex}">${String.fromCharCode(65 + optionIndex)}) ${option}</button>`).join('')}
      </div>
    </div>
  `;
}

function renderQuiz(story) {
  const questions = story.quiz.map((question) => {
    const options = [...question.options];
    for (let index = options.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [options[index], options[randomIndex]] = [options[randomIndex], options[index]];
    }
    return { ...question, options };
  });

  state.activityGame = {
    type: 'quiz',
    storyId: story.id,
    questions,
    currentIndex: 0,
    score: 0,
  };
  renderQuizQuestion(story);
}

function openColorScene(sceneId) {
  const scene = coloringScenes.find((item) => item.id === sceneId);
  if (!scene) return;

  state.currentScene = scene;
  document.getElementById('colorTitle').textContent = `🎨 ${scene.title}`;
  document.getElementById('colorModal').classList.remove('hidden');
  document.getElementById('activeColorPreview').style.backgroundColor = state.activeColor;

  const palette = document.getElementById('colorPalette');
  const getColorButtons = (colors) => colors
    .map(
      (color) => `<button type="button" data-color="${color}" style="background:${color};${color === '#000000' ? 'border-color:#000;box-shadow:inset 0 0 0 2px #000;' : ''}" aria-label="Color ${color}"></button>`
    )
    .join('');
  palette.innerHTML = `
    <div class="palette-group">
      <div class="palette palette-main">${getColorButtons(mainPaletteColors)}</div>
    </div>
  `;

  initCanvas(scene);

  const progress = state.progress;
  progress.colored = (progress.colored || 0) + 1;
  state.progress = progress;
  saveState();
  renderAchievements();
}

function initCanvas(scene) {
  const canvas = document.getElementById('colorCanvas');
  const ctx = canvas.getContext('2d');
  state.canvasContext = ctx;

  const sceneSvg = new Image();
  sceneSvg.onload = () => {
    const scale = Math.min(1, 1000 / sceneSvg.naturalWidth, 700 / sceneSvg.naturalHeight);
    canvas.width = Math.max(1, Math.round(sceneSvg.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(sceneSvg.naturalHeight * scale));
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    state.baseCanvas = document.createElement('canvas');
    state.baseCanvas.width = canvas.width;
    state.baseCanvas.height = canvas.height;
    state.colorCanvas = document.createElement('canvas');
    state.colorCanvas.width = canvas.width;
    state.colorCanvas.height = canvas.height;

    const baseContext = state.baseCanvas.getContext('2d');
    baseContext.drawImage(sceneSvg, 0, 0, canvas.width, canvas.height);
    state.baseImageData = baseContext.getImageData(0, 0, canvas.width, canvas.height);
    drawColoringCanvas();
  };
  sceneSvg.src = scene.image;

  canvas.onclick = (event) => {
    if (!state.baseImageData) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((event.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(((event.clientY - rect.top) / rect.height) * canvas.height);
    fillColorRegion(x, y);
  };
}

function drawColoringCanvas() {
  const canvas = document.getElementById('colorCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(state.baseCanvas, 0, 0);
  ctx.drawImage(state.colorCanvas, 0, 0);
}

function fillColorRegion(startX, startY) {
  const width = state.baseCanvas.width;
  const height = state.baseCanvas.height;
  const basePixels = state.baseImageData.data;
  const colorContext = state.colorCanvas.getContext('2d');
  const colorPixels = colorContext.getImageData(0, 0, width, height);
  const startIndex = (startY * width + startX) * 4;
  const startRed = basePixels[startIndex];
  const startGreen = basePixels[startIndex + 1];
  const startBlue = basePixels[startIndex + 2];
  const startBrightness = (startRed + startGreen + startBlue) / 3;

  if (startBrightness < 200 || Math.max(startRed, startGreen, startBlue) - Math.min(startRed, startGreen, startBlue) > 35) return;

  const visited = new Uint8Array(width * height);
  const queue = [[startX, startY]];
  const [red, green, blue] = state.activeColor.match(/\w\w/g).map((value) => parseInt(value, 16));
  let queueIndex = 0;

  while (queueIndex < queue.length) {
    const [x, y] = queue[queueIndex++];
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    const pixelIndex = y * width + x;
    if (visited[pixelIndex]) continue;
    visited[pixelIndex] = 1;

    const dataIndex = pixelIndex * 4;
    const brightness = (basePixels[dataIndex] + basePixels[dataIndex + 1] + basePixels[dataIndex + 2]) / 3;
    const colorDistance = Math.abs(basePixels[dataIndex] - startRed)
      + Math.abs(basePixels[dataIndex + 1] - startGreen)
      + Math.abs(basePixels[dataIndex + 2] - startBlue);
    if (brightness < 185 || colorDistance > 90) continue;

    if (state.eraserMode) {
      colorPixels.data[dataIndex + 3] = 0;
    } else {
      colorPixels.data[dataIndex] = red;
      colorPixels.data[dataIndex + 1] = green;
      colorPixels.data[dataIndex + 2] = blue;
      colorPixels.data[dataIndex + 3] = 255;
    }

    queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  colorContext.putImageData(colorPixels, 0, 0);
  drawColoringCanvas();
}

function saveCanvasAsImage() {
  const canvas = document.getElementById('colorCanvas');
  const link = document.createElement('a');
  link.download = `${state.currentScene ? state.currentScene.title : 'cuento'}-colorido.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
  showToast('¡Tu dibujo fue guardado!');
}

function printCanvas() {
  const canvas = document.getElementById('colorCanvas');
  if (!canvas) return;

  let exportCanvas = canvas;

  if (state.baseCanvas && state.colorCanvas) {
    exportCanvas = document.createElement('canvas');
    exportCanvas.width = state.baseCanvas.width;
    exportCanvas.height = state.baseCanvas.height;
    const exportCtx = exportCanvas.getContext('2d');
    exportCtx.clearRect(0, 0, exportCanvas.width, exportCanvas.height);
    exportCtx.drawImage(state.baseCanvas, 0, 0);
    exportCtx.drawImage(state.colorCanvas, 0, 0);
  }

  const image = exportCanvas.toDataURL('image/png');
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.opacity = '0';
  iframe.style.pointerEvents = 'none';
  document.body.appendChild(iframe);

  iframe.srcdoc = `
    <!doctype html>
    <html>
      <head>
        <title>Imprimir dibujo</title>
        <style>
          body {
            margin: 0;
            padding: 24px;
            background: #fff;
            display: grid;
            place-items: center;
            font-family: Arial, sans-serif;
          }
          img {
            width: 100%;
            max-width: 800px;
            height: auto;
            display: block;
            margin: 0 auto;
          }
        </style>
      </head>
      <body>
        <img src="${image}" alt="Dibujo para imprimir" />
      </body>
    </html>
  `;

  iframe.onload = () => {
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch (error) {
      showToast('No se pudo abrir la ventana de impresión. Intenta de nuevo.');
    }

    setTimeout(() => {
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
    }, 1200);
  };
}

function clearCanvas() {
  const canvas = document.getElementById('colorCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (state.currentScene) initCanvas(state.currentScene);
}

function setupEvents() {
  document.addEventListener('click', (event) => {
    const modalButton = event.target.closest('[data-open-modal]');
    if (modalButton) {
      const modalId = modalButton.dataset.openModal;
      if (modalId === 'addVideoModal') populateVideoStories();
      if (modalId === 'deleteVideosModal') renderDeleteVideosMenu();
      modalButton.closest('.modal')?.classList.add('hidden');
      document.getElementById(modalId).classList.remove('hidden');
      return;
    }

    const filterBtn = event.target.closest('[data-category]');
    if (filterBtn) {
      state.selectedCategory = filterBtn.dataset.category;
      renderFilters();
      renderStories();
      return;
    }

    const activityTypeButton = event.target.closest('[data-activity-type]');
    if (activityTypeButton) {
      const story = stories.find((item) => item.id === state.activityStoryId);
      if (story) {
        document.getElementById('activityChoices').classList.add('hidden');
        if (activityTypeButton.dataset.activityType === 'quiz') renderQuiz(story);
        else renderWordSearch(story);
      }
      return;
    }

    const quizOption = event.target.closest('[data-quiz-option]');
    if (quizOption && state.activityGame?.type === 'quiz') {
      const game = state.activityGame;
      const story = stories.find((item) => item.id === game.storyId);
      const question = game.questions[game.currentIndex];
      const selectedOption = question.options[Number(quizOption.dataset.quizOption)];
      const optionButtons = document.querySelectorAll('[data-quiz-option]');
      optionButtons.forEach((button) => { button.disabled = true; });
      optionButtons.forEach((button) => {
        const option = question.options[Number(button.dataset.quizOption)];
        button.classList.toggle('is-correct', option === question.answer);
        button.classList.toggle('is-wrong', option === selectedOption && option !== question.answer);
      });
      if (selectedOption === question.answer) game.score += 1;
      const isLastQuestion = game.currentIndex === game.questions.length - 1;
      document.getElementById('activityResult').textContent = selectedOption === question.answer ? '¡Correcto! 🌟' : `La respuesta correcta es: ${question.answer}`;
      const nextLabel = isLastQuestion ? 'Ver resultado' : 'Siguiente pregunta';
      document.getElementById('activityGame').insertAdjacentHTML('beforeend', `<button type="button" class="primary-btn quiz-next" data-quiz-next>${nextLabel}</button>`);
      return;
    }

    const quizNext = event.target.closest('[data-quiz-next]');
    if (quizNext && state.activityGame?.type === 'quiz') {
      const game = state.activityGame;
      if (game.currentIndex < game.questions.length - 1) {
        game.currentIndex += 1;
        document.getElementById('activityResult').textContent = '';
        renderQuizQuestion(stories.find((story) => story.id === game.storyId));
      } else {
        document.getElementById('activityGame').innerHTML = `<p class="activity-prompt">Has conseguido ${game.score} de ${game.questions.length} respuestas correctas.</p>`;
        document.getElementById('activityResult').textContent = game.score === game.questions.length ? '¡Perfecto! 🌟' : '¡Buen trabajo! Puedes volver a intentarlo.';
        document.getElementById('completeActivityBtn').classList.remove('hidden');
      }
      return;
    }

    if (event.target.closest('#completeActivityBtn')) {
      completeActivity(state.activityStoryId);
      return;
    }

    const wordTarget = event.target.closest('[data-target-index]');
    if (wordTarget && state.activityGame?.type === 'word-search') {
      const game = state.activityGame;
      const targetIndex = Number(wordTarget.dataset.targetIndex);
      if (!game.foundTargets.includes(targetIndex)) {
        game.targetIndex = targetIndex;
        game.selected = [];
        document.querySelectorAll('.word-cell').forEach((cell) => cell.classList.remove('is-selected'));
        document.querySelectorAll('.word-target').forEach((target) => target.classList.toggle('is-current', target === wordTarget));
      }
      return;
    }

    const wordCell = event.target.closest('[data-word-index]');
    if (wordCell && state.activityGame?.type === 'word-search') {
      const game = state.activityGame;
      const target = game.targets[game.targetIndex];
      const selectedIndex = Number(wordCell.dataset.wordIndex);
      const targetPath = game.paths[game.targetIndex];
      if (targetPath.includes(selectedIndex) && !game.selected.includes(selectedIndex)) {
        game.selected.push(selectedIndex);
        wordCell.classList.add('is-selected');
        if (game.selected.length === target.length) {
          document.querySelector(`[data-target-index="${game.targetIndex}"]`)?.classList.add('is-found');
          document.querySelectorAll(`.word-cell[data-word-target="${game.targetIndex}"]`).forEach((cell) => {
            cell.classList.add('is-found');
            cell.classList.remove('is-selected');
          });
          game.foundTargets.push(game.targetIndex);
          game.selected = [];
          const nextTarget = game.targets.findIndex((_, index) => !game.foundTargets.includes(index));
          if (nextTarget < 0) completeActivity(game.storyId);
          else {
            game.targetIndex = nextTarget;
            document.querySelectorAll('.word-target').forEach((target) => target.classList.toggle('is-current', Number(target.dataset.targetIndex) === nextTarget));
          }
        }
      }
      return;
    }

    const actionBtn = event.target.closest('[data-action]');
    if (!actionBtn) return;

    const { action, id, scene } = actionBtn.dataset;

    if (action === 'edit-story' && isAdmin()) {
      openStoryEditor(id);
      return;
    }
    if (action === 'edit-video' && isAdmin()) {
      openVideoEditor(id);
      return;
    }
    if (action === 'delete-video' && isAdmin()) {
      deleteVideo(id);
      return;
    }
    if (action === 'edit-character' && isAdmin()) {
      openCharacterEditor(Number(actionBtn.dataset.characterIndex));
      return;
    }

    if (action === 'toggle-favorite') {
      toggleFavorite(id);
      renderStories();
      renderFavorites();
      return;
    }

    if (action === 'buy-item') {
      const item = shopItems.find((entry) => entry.id === id);
      if (!item) return;
      const points = getCurrentPoints();
      if (state.purchases.includes(item.id)) {
        showToast('Este objeto ya lo tienes en tu inventario.');
        return;
      }
      if (points < item.price) {
        showToast('No tienes suficientes puntos para comprar este objeto.');
        return;
      }
      state.purchases = [...state.purchases, item.id];
      saveState();
      renderShop();
      renderAchievements();
      showToast(`${item.name} comprado con éxito.`);
      return;
    }

    if (action === 'read') openReader(id);
    if (action === 'listen') openAudio(id);
    if (action === 'watch') openVideo(id);
    if (action === 'activity') openActivity(id);
    if (action === 'open-color') openColorScene(scene);
    if (action === 'print-color') {
      const scene = coloringScenes.find((item) => item.id === actionBtn.dataset.scene);
      if (scene) openColorScene(scene.id);
      printCanvas();
    }
    if (action === 'save-color') {
      const scene = coloringScenes.find((item) => item.id === actionBtn.dataset.scene);
      if (scene) openColorScene(scene.id);
      saveCanvasAsImage();
    }

    if (action === 'close-modal') {
      event.target.closest('.modal')?.classList.add('hidden');
      if (event.target.closest('#videoModal')) {
        stopVideoPlayback();
      }
      stopAudioPlayback();
    }
  });

  document.querySelectorAll('[data-close]').forEach((button) => {
    button.addEventListener('click', () => {
      const modalId = button.dataset.close;
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('hidden');
      if (modalId === 'videoModal') {
        stopVideoPlayback();
      }
      stopAudioPlayback();
    });
  });

  document.getElementById('addStoryForm').addEventListener('submit', addCustomStory);
  document.getElementById('addVideoForm').addEventListener('submit', addVideoToStory);
  document.getElementById('addCharacterForm').addEventListener('submit', addCustomCharacter);

  document.getElementById('decreaseFont').addEventListener('click', () => {
    state.fontSize = Math.max(14, state.fontSize - 2);
    updateReaderDisplay();
  });

  document.getElementById('increaseFont').addEventListener('click', () => {
    state.fontSize = Math.min(28, state.fontSize + 2);
    updateReaderDisplay();
  });

  document.getElementById('prevPageBtn').addEventListener('click', () => {
    if (state.currentReaderIndex > 0) {
      stopAudioPlayback();
      state.currentReaderIndex -= 1;
      updateReaderDisplay();
    }
  });

  document.getElementById('nextPageBtn').addEventListener('click', () => {
    if (!state.currentReader) return;
    if (state.currentReaderIndex < state.currentReader.pages.length - 1) {
      stopAudioPlayback();
      state.currentReaderIndex += 1;
      updateReaderDisplay();
      return;
    }

    completeStoryRead(state.currentReader.id);
    document.getElementById('readerModal').classList.add('hidden');
  });

  const readerPage = document.getElementById('readerPage');
  let readerTouchStartX = 0;
  let readerTouchStartY = 0;
  readerPage.addEventListener('touchstart', (event) => {
    const touch = event.changedTouches[0];
    readerTouchStartX = touch.clientX;
    readerTouchStartY = touch.clientY;
  }, { passive: true });
  readerPage.addEventListener('touchend', (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - readerTouchStartX;
    const deltaY = touch.clientY - readerTouchStartY;
    if (Math.abs(deltaX) < 55 || Math.abs(deltaX) < Math.abs(deltaY) * 1.3) return;
    event.preventDefault();
    if (deltaX < 0) document.getElementById('nextPageBtn').click();
    else document.getElementById('prevPageBtn').click();
  }, { passive: false });

  document.getElementById('readAudioBtn').addEventListener('click', () => {
    if (state.currentReader) {
      let offset = 0;
      state.audioPageOffsets = state.currentReader.pages.map((page) => {
        const pageOffset = offset;
        offset += page.text.length + 1;
        return pageOffset;
      });
      state.audioText = state.currentReader.pages.map((page) => page.text).join(' ');
      state.activeAudioWord = -1;
      speakText();
    }
  });

  document.getElementById('playAudioBtn').addEventListener('click', () => speakText());
  document.getElementById('pauseAudioBtn').addEventListener('click', pauseAudio);
  document.getElementById('restartAudioBtn').addEventListener('click', restartAudio);
  document.getElementById('audioVolume').addEventListener('input', (event) => {
    if (state.audioUtterance) {
      state.audioUtterance.volume = Number(event.target.value);
    }
  });
  document.getElementById('audioRate').addEventListener('input', (event) => {
    state.audioRate = Number(event.target.value);
    document.getElementById('audioRateValue').textContent = `${state.audioRate.toFixed(1)}x`;
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      speakText();
    }
  });

  document.getElementById('videoPlayBtn').addEventListener('click', () => {
    const video = getActiveVideoElement();
    if (video) {
      video.play().catch(() => showToast('No se pudo reproducir el video.'));
      return;
    }
    if (!postEmbeddedVideoCommand('playVideo')) showToast('Este video no permite reproducción externa.');
  });

  document.getElementById('videoPauseBtn').addEventListener('click', () => {
    const video = getActiveVideoElement();
    if (video) {
      video.pause();
      return;
    }
    if (!postEmbeddedVideoCommand('pause')) showToast('Este video no permite pausa externa.');
  });

  document.getElementById('videoMuteBtn').addEventListener('click', (event) => {
    const video = getActiveVideoElement();
    if (video) {
      video.muted = !video.muted;
      event.currentTarget.textContent = video.muted ? '🔇 Activar sonido' : '🔊 Silenciar';
      return;
    }
    const isMuted = event.currentTarget.dataset.muted === 'true';
    postEmbeddedVideoCommand(isMuted ? 'unMute' : 'mute');
    event.currentTarget.dataset.muted = String(!isMuted);
    event.currentTarget.textContent = isMuted ? '🔊 Silenciar' : '🔇 Activar sonido';
  });

  document.getElementById('videoFullscreenBtn').addEventListener('click', () => {
    const video = getActiveVideoElement();
    const videoFrame = document.getElementById('storyVideoFrame');
    const target = video || (!videoFrame.classList.contains('hidden') ? videoFrame : null);
    if (!target?.requestFullscreen) {
      showToast('La pantalla completa no está disponible aquí.');
      return;
    }
    target.requestFullscreen().catch(() => showToast('No se pudo activar la pantalla completa.'));
  });

  document.getElementById('videoReplayBtn').addEventListener('click', () => {
    const video = getActiveVideoElement();
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => showToast('No se pudo repetir el video.'));
      return;
    }
    if (!postEmbeddedVideoCommand('seekTo', 0)) {
      showToast('Este video no permite repetición externa.');
      return;
    }
    postEmbeddedVideoCommand('playVideo');
  });

  document.getElementById('videoVolume').addEventListener('input', (event) => {
    const volume = Number(event.target.value);
    const video = getActiveVideoElement();
    if (video) {
      video.volume = volume;
      video.muted = volume === 0;
      return;
    }
    if (state.currentVideoSource?.kind === 'youtube') postEmbeddedVideoCommand('setVolume', volume * 100);
    if (state.currentVideoSource?.kind === 'vimeo') postEmbeddedVideoCommand('setVolume', volume);
  });

  document.getElementById('videoActivityBtn').addEventListener('click', () => {
    const storyId = state.currentVideoStoryId;
    if (!storyId) return;
    document.getElementById('videoModal').classList.add('hidden');
    stopVideoPlayback();
    openActivity(storyId);
  });



  document.getElementById('eraserBtn').addEventListener('click', () => {
    state.eraserMode = !state.eraserMode;
    document.getElementById('eraserBtn').textContent = state.eraserMode ? '🧽 Modo borrador activo' : '🧽 Borrador';
  });

  document.getElementById('clearCanvasBtn').addEventListener('click', clearCanvas);
  document.getElementById('saveCanvasBtn').addEventListener('click', saveCanvasAsImage);
  document.getElementById('printCanvasBtn').addEventListener('click', printCanvas);

  document.getElementById('colorPalette').addEventListener('click', (event) => {
    const colorBtn = event.target.closest('[data-color]');
    if (!colorBtn) return;
    state.activeColor = colorBtn.dataset.color;
    document.getElementById('activeColorPreview').style.backgroundColor = state.activeColor;
    state.eraserMode = false;
    document.getElementById('eraserBtn').textContent = '🧽 Borrador';
  });

  let activeTab = null;
  let previousTab = null;
  const setActiveTab = (target) => {
    if (activeTab && activeTab !== target) previousTab = activeTab;
    activeTab = target;
    document.querySelectorAll('[data-tab-section]').forEach((section) => {
      const isVisible = section.dataset.tabSection === target;
      section.classList.toggle('is-visible', isVisible);
    });

    document.querySelectorAll('[data-tab-target]').forEach((tab) => {
      tab.classList.toggle('is-active', tab.dataset.tabTarget === target);
    });
  };

  document.querySelectorAll('[data-tab-target]').forEach((button) => {
    if (button.classList.contains('back-home-btn')) button.textContent = '⬅️ Volver';
    button.addEventListener('click', (event) => {
      const target = button.classList.contains('back-home-btn')
        ? previousTab || 'home'
        : button.dataset.tabTarget;
      if (!target) return;

      event.preventDefault();
      setActiveTab(target);
      history.replaceState(null, '', `#${target}`);
      button.closest('.quick-nav')?.removeAttribute('open');
    });
  });

  const initialTab = window.location.hash.replace('#', '') || 'home';
  setActiveTab(document.querySelector(`[data-tab-target="${initialTab}"]`) ? initialTab : 'home');
}

async function setupAuthentication() {
  const loginButton = document.getElementById('googleLoginBtn');
  const logoutButton = document.getElementById('logoutBtn');
  const authButton = document.getElementById('authButton');
  const addContentButton = document.getElementById('addContentButton');
  const deleteVideosButton = document.getElementById('deleteVideosButton');
  const authStatus = document.getElementById('authStatus');
  const emailAuthForm = document.getElementById('emailAuthForm');
  const authEmail = document.getElementById('authEmail');
  const authPassword = document.getElementById('authPassword');
  const authTitle = document.getElementById('authTitle');
  const authSubmitButton = document.getElementById('authSubmitBtn');
  const loginModeButton = document.getElementById('showLoginMode');
  const signupModeButton = document.getElementById('showSignupMode');
  const authModeTabs = document.querySelector('.auth-mode-tabs');
  const googleLoginButton = document.getElementById('googleLoginBtn');
  const authDivider = document.querySelector('.auth-divider');
  const loginGate = document.getElementById('loginGate');
  let authMode = 'login';
  const authRedirectUrl = supabaseConfig.redirectUrl || supabaseConfig.authRedirectUrl || `${window.location.origin}${window.location.pathname}`;

  loginGate?.classList.toggle('hidden', localStorage.getItem(guestModeKey) === 'true');
  document.getElementById('guestModeBtn')?.addEventListener('click', () => {
    localStorage.setItem(guestModeKey, 'true');
    loginGate?.classList.add('hidden');
  });

  const updateAuthUi = (session) => {
    const user = session?.user;
    if (user) localStorage.removeItem(guestModeKey);
    const isGuest = localStorage.getItem(guestModeKey) === 'true';
    const adminEmails = (supabaseConfig.adminEmails || []).map((email) => email.toLowerCase());
    state.isAdmin = Boolean(user?.email && adminEmails.includes(user.email.toLowerCase()));
    if (authButton) authButton.textContent = user ? `👤 ${user.user_metadata?.full_name || user.email}` : '🔐 Iniciar sesión';
    addContentButton?.classList.toggle('hidden', !state.isAdmin);
    deleteVideosButton?.classList.toggle('hidden', !state.isAdmin);
    loginGate?.classList.toggle('hidden', Boolean(user) || isGuest);
    loginButton?.classList.toggle('hidden', Boolean(user));
    logoutButton?.classList.toggle('hidden', !user);
    authModeTabs?.classList.toggle('hidden', Boolean(user));
    googleLoginButton?.classList.toggle('hidden', Boolean(user));
    authDivider?.classList.toggle('hidden', Boolean(user));
    emailAuthForm?.classList.toggle('hidden', Boolean(user));
    if (authTitle) authTitle.textContent = user ? 'Sesión iniciada' : (authMode === 'signup' ? 'Crea tu cuenta' : 'Inicia sesión');
    if (authStatus) authStatus.textContent = user
      ? `Sesión iniciada como ${user.email}${state.isAdmin ? ' · Administrador' : ''}`
      : '';
    renderStories();
    renderVideos();
    renderCharacters();
  };

  if (!supabaseClient) {
    loginButton?.addEventListener('click', () => {
      if (authStatus) authStatus.textContent = 'Completa la URL y la anon key en supabase-config.js.';
    });
    return;
  }

  const getEmailCredentials = () => ({
    email: authEmail?.value.trim() || '',
    password: authPassword?.value || '',
  });

  const setAuthMode = (mode) => {
    authMode = mode;
    const signup = mode === 'signup';
    authTitle.textContent = signup ? 'Crea tu cuenta' : 'Inicia sesión';
    authSubmitButton.textContent = signup ? '📝 Crear cuenta' : '🔑 Iniciar sesión';
    authPassword.autocomplete = signup ? 'new-password' : 'current-password';
    loginModeButton.classList.toggle('is-active', !signup);
    signupModeButton.classList.toggle('is-active', signup);
    if (authStatus) authStatus.textContent = '';
  };

  loginModeButton?.addEventListener('click', () => setAuthMode('login'));
  signupModeButton?.addEventListener('click', () => setAuthMode('signup'));

  emailAuthForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { email, password } = getEmailCredentials();
    if (authMode === 'login') {
      if (authStatus) authStatus.textContent = 'Iniciando sesión...';
      const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error && authStatus) authStatus.textContent = error.message;
      return;
    }
    if (authStatus) authStatus.textContent = 'Creando cuenta...';
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: authRedirectUrl },
    });
    if (error && authStatus) authStatus.textContent = error.message;
    else if (data.session && authStatus) authStatus.textContent = 'Cuenta creada y sesión iniciada.';
    else if (authStatus) authStatus.textContent = 'Cuenta creada. Revisa tu correo para confirmarla.';
  });

  loginButton?.addEventListener('click', async () => {
    if (authStatus) authStatus.textContent = 'Abriendo Google...';
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: authRedirectUrl }
    });
    if (error && authStatus) authStatus.textContent = error.message;
  });

  logoutButton?.addEventListener('click', async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error && authStatus) authStatus.textContent = error.message;
  });

  try {
    const { data, error } = await supabaseClient.auth.getSession();
    console.log('Diagnóstico auth: getSession()', { session: data?.session, error });
    if (error) {
      if (authStatus) authStatus.textContent = `No se pudo leer la sesión: ${error.message}`;
      return;
    }
    updateAuthUi(data.session);
    if (!data.session) {
      return;
    }
    const { data: userData, error: userError } = await supabaseClient.auth.getUser();
    console.log('Diagnóstico auth: getUser()', { userData, userError });
    if (userError && authStatus) authStatus.textContent = `No se pudo leer el usuario: ${userError.message}`;
    if (userData.user) {
      updateAuthUi({ user: userData.user });
      await loadUserProfile();
      renderFavorites();
      renderAchievements();
    }
  } catch (error) {
    console.error('Diagnóstico auth: error general', error);
    if (authStatus) authStatus.textContent = `Error de autenticación: ${error.message}`;
  }

  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    updateAuthUi(session);
    if (session?.user) {
      await loadRemoteStoryVideos();
      renderVideos();
      await loadUserProfile();
      renderFavorites();
      renderAchievements();
    }
  });
}

function toggleFavorite(storyId) {
  const exists = state.favorites.includes(storyId);
  state.favorites = exists ? state.favorites.filter((id) => id !== storyId) : [...state.favorites, storyId];
  saveState();
  renderFavorites();
  renderStories();
  showToast(exists ? 'Quitado de favoritos' : 'Añadido a favoritos');
}

async function initialize() {
  loadState();

  try {
    await loadStoriesFromFiles();
  } catch (error) {
    console.error(error);
    stories = [];
    showToast('No se pudieron cargar los cuentos. Abre la app desde un servidor local.');
  }

  renderFilters();
  renderStories();
  renderAudioGrid();
  renderVideos();
  renderActivities();
  renderColoring();
  renderCharacters();
  renderValues();
  renderFavorites();
  renderAchievements();
  setupEvents();
  await setupAuthentication();
}

initialize();
