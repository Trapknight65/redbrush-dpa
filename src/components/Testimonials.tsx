import Card from "./Card";

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "CEO",
        company: "TechStart Inc.",
        content: "Redbrush transformed our digital presence. Their team delivered a stunning website that increased our conversions by 150%. Highly recommended!",
        avatar: "👩‍💼",
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Marketing Director",
        company: "GrowthCo",
        content: "Working with Redbrush was a game-changer. Their strategic approach to our rebrand helped us stand out in a crowded market.",
        avatar: "👨‍💼",
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Founder",
        company: "Innovate Labs",
        content: "The team at Redbrush is exceptional. They understood our vision and brought it to life with creativity and professionalism.",
        avatar: "👩‍💻",
    },
];

export default function Testimonials() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-dark-gray mb-4">
                What Our <span className="text-crimson-red">Clients Say</span>
            </h2>
            <p className="text-center text-canvas-white mb-8 sm:mb-12 max-w-2xl mx-auto">
                Don't just take our word for it - hear from some of our satisfied clients.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="flex flex-col">
                        <div className="flex items-center mb-4">
                            <div className="text-4xl mr-4">{testimonial.avatar}</div>
                            <div>
                                <h4 className="font-bold text-crimson-red">{testimonial.name}</h4>
                                <p className="text-sm text-canvas-white">
                                    {testimonial.role}, {testimonial.company}
                                </p>
                            </div>
                        </div>
                        <p className="text-canvas-white italic text-sm sm:text-base">"{testimonial.content}"</p>
                    </Card>
                ))}
            </div>
        </section>
    );
}
