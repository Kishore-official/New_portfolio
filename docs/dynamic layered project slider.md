Use layout-system and motion-ui to turn the “Products Projects Things I've Built” section into a dynamic premium project slider.

Goal:
Create a high-end interactive project showcase where each project moves dynamically and transitions smoothly, instead of feeling like a static card list.

What I want:
- one active project card displayed prominently in the center
- previous and next project cards partially visible on the left and right as previews
- clicking next or previous should move the cards dynamically in a smooth layered transition
- the active project should move out and the next project should move into focus in a premium, fluid way
- the section should feel like a cinematic product showcase, not a basic carousel

Behavior:
- center card = active, dominant, largest, sharpest
- left and right cards = secondary previews, slightly smaller and recessed
- transitions should use horizontal movement combined with scale, depth, and opacity changes
- movement should feel smooth, premium, and intentional
- preserve keyboard and touch usability if already present

Inside each active project card:
- animate the project label/category
- animate the title
- animate the subtitle/description
- animate the tech stack pills
- animate the CTA
- animate the project visuals in a subtle way so each slide feels alive

Design direction:
- maintain a clean, modern, premium look
- avoid generic slider behavior
- avoid overly flashy effects
- make the motion feel polished and product-focused
- ensure the layout remains responsive and readable

Constraints:
- Tailwind + Framer Motion only
- no new dependencies
- do not redesign unrelated sections
- write changes directly into the project files