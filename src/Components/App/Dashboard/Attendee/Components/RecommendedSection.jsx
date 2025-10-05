import EventCard from "../../Common/EventsCard";

const RecommendedSection = () => {
    const recommendedEvents = [
      {
        id: 1,
        title: "Tech Conference 2025",
        category: "Tech",
        date: "May 25, 2025",
        location: "5, Alen Avenue, Lagos",
        price: "₦ 5,000",
        image: "/assets/event1.png",
        isPaid: true,
      },
      {
        id: 2,
        title: "Summer Music Festival",
        category: "Music",
        date: "Jun 15, 2025",
        location: "15, Chevron, Lekki, Lagos",
        price: "Free",
        image: "/assets/event2.png",
        isPaid: false,
      },
      {
        id: 3,
        title: "Business Leadership Summit",
        category: "Business",
        date: "Jul 8, 2025",
        location: "1, Airport Road, Benin City",
        price: "₦ 2,000",
        image: "/assets/event3.png",
        isPaid: true,
      },
    ];
  
    const handleEventClick = (eventId) => {
      console.log(`Navigate to event ${eventId}`);
      // In a real app: navigate(`/discover-events/${eventId}`);
    };
  
    return (
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Recommended For You
        </h2>
        <p className="text-gray-600 mb-4">
          Based on your interests and past events.
        </p>
  
        {/* Recommended Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEventClick={handleEventClick}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default RecommendedSection