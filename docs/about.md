# About the Control Systems Course

## Why Control Theory Matters

Control theory is one of the most universally applicable subjects in electrical engineering. It's the mathematics behind everything that needs to stay stable, reach a target, or respond gracefully to disturbances—from the thermostat in your home to the autopilot in commercial aircraft, from the cruise control in your car to the stabilization systems in smartphones.

Yet for many students, control theory feels abstract and intimidating. Transfer functions, Laplace transforms, Bode plots, and stability margins can seem like disconnected mathematical exercises rather than powerful tools for building systems that actually work. Traditional textbooks often assume students arrive with strong math backgrounds and access to expensive software licenses.

We believe there's a better way.

## An Intelligent Textbook for Everyone

This course is part of an international effort to **democratize engineering education**. We've designed it from the ground up to serve students around the world—including those who:

- Can't afford expensive commercial software like MATLAB
- Attend institutions without extensive lab equipment
- Are self-learners exploring control theory on their own
- Have limited calculus backgrounds but strong intuition
- Learn best through interactive exploration rather than passive reading

Every concept in this book is illustrated with **MicroSims**—small, browser-based simulations that let you adjust parameters and immediately see what happens. You don't need to install anything. You don't need a license. You just need curiosity and a web browser.

We've used AI to help create content that's accessible, conversational, and rich with analogies. Our mascot **Gyra**, a self-balancing robot who struggles with the same stability challenges you'll study, provides a tangible anchor for abstract concepts. When you learn about proportional gain, you'll see Gyra wobble. When you add derivative control, you'll watch her calm down. The math becomes real.

## Background

My journey into control theory started unexpectedly. Around 2015, I began mentoring kids in STEM classes through a CoderDojo program—a global network of free coding clubs for young people. I wanted to bring robotics into the classroom, so I purchased my first two-wheeled self-balancing robot kit.

That little robot changed everything.

I remember staring at the Arduino code, trying to tune the PID values. I didn't really understand what I was doing. Why did increasing Kp make the robot shake? Why did Ki help it stand straighter but sometimes caused it to oscillate wildly? I turned knobs blindly, celebrated small victories, and crashed the robot into walls more times than I can count.

But I was hooked. And more importantly, the students were hooked.

Later, I discovered the **MIP robot**—a commercial self-balancing robot designed for education. I spent countless hours with MIP in classrooms, showing students how it worked. We'd add weight to its arms and watch it adapt. We'd push it gently and see it recover. Kids who had never heard of control theory were witnessing it in action, developing intuition for concepts they'd later formalize in college courses.

Those experiences planted a seed: what if we could give every student a "virtual MIP experience"? What if readers around the world could experiment with a simulated self-balancing robot, adjusting controller parameters and watching the results in real time?

That vision became this book.

The MicroSims throughout these chapters are my attempt to bring that classroom magic to everyone. When you tune a PID controller in our simulations, you're doing exactly what I did with those first Arduino robots—learning through play, building intuition through experimentation, and discovering that control theory isn't just abstract math. It's the science of making things work.

*— Dan McCreary, February 1, 2026*

## Reusable MicroSim Library

Beyond serving students directly, this course is designed to create a **library of reusable MicroSims** that any educator can incorporate into their own control systems curriculum. Each simulation is self-contained and can be embedded in any website, learning management system, or online course using a simple iframe:

```html
<iframe src="https://dmccreary.github.io/control-systems/sims/pid-controller/"
        width="100%" height="450px"></iframe>
```

### Edit with One Click

Many of our MicroSims include a direct link to the [p5.js Editor](https://editor.p5js.org/), allowing you to open, modify, and experiment with the code instantly. No setup required—just click "Edit with the p5.js Editor" below any simulation, and you're in a full development environment where you can tweak parameters, change visualizations, or adapt the simulation for your own teaching needs.

### Findable Through Faceted Search

We've invested significant effort in creating accurate **Dublin Core metadata** for every MicroSim—including title, description, subject keywords, learning objectives, Bloom's Taxonomy level, and technical specifications. This metadata powers a faceted search system that helps educators discover relevant simulations across multiple intelligent textbooks.

Try it yourself: [Search for Control Systems MicroSims](https://dmccreary.github.io/search-microsims/search/demo.html?q=control)

The search allows filtering by subject area, difficulty level, visualization type, and more. Our goal is to build a growing ecosystem where simulations created for one course can benefit students and teachers everywhere.

## Acknowledgments

This textbook was created with the assistance of generative AI tools, particularly Claude by Anthropic. The interactive MicroSims use open-source libraries including p5.js and vis-network.js. The site is built with MkDocs Material, and all code examples use Python with open-source libraries like python-control, NumPy, SciPy, and Matplotlib.

We're grateful to the global open-source community that makes projects like this possible, and to the students and educators who provided feedback during development.

## Contact

Questions, suggestions, or feedback? We'd love to hear from you. Please visit the [GitHub repository](https://github.com/dmccreary/control-systems) to open an issue or contribute to the project.
