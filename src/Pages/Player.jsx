const Player = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-4">Movie Player</h1>

      <video controls className="w-full max-w-3xl">
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default Player;