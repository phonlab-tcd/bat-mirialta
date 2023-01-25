import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

import { corsHeaders } from '../_shared/cors.ts';
import { broadSlenderCheck } from './errorTypes/broadSlenderCheck.ts';
import { fadaCheck } from './errorTypes/fadaCheck.ts';
import { typoCheck } from './errorTypes/typoCheck.ts';
import { verbConjugationCheck } from './errorTypes/verbConjugationCheck.ts';

serve(async (req) => {
  // Needed to pass CORS check on browser requests.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // gets the user's input word and the correct answer
    const { word, target } = await req.json();

    // runs through the checks
    const broadSlenderCheckOutput = broadSlenderCheck(word, target);
    const fadaOutput = fadaCheck(word, target);
    const typoOutput = typoCheck(word, target);
    const verbConjugationOutput = verbConjugationCheck(word, target);

    // creates a data object to return
    const data = {
      broadSlenderCheckOutput: broadSlenderCheckOutput,
      fadaOutput: fadaOutput,
      typoOutput: typoOutput,
      verbConjugationOutput: verbConjugationOutput,
    };

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
